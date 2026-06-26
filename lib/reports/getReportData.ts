import { prisma } from "@/lib/prisma";
import type { DateRange } from "@/lib/dates/dateFilter";

export type MonthlyDataPoint = {
  month: string;
  amount: number;
};

export type CustomerReportItem = {
  name: string;
  amount: number;
};

export type ReportData = {
  monthlyCredits: MonthlyDataPoint[];
  monthlyPayments: MonthlyDataPoint[];
  monthlyOutstanding: MonthlyDataPoint[];
  customerCredits: CustomerReportItem[];
  customerPayments: CustomerReportItem[];
};

type MonthBucket = {
  key: string;
  label: string;
  start: Date;
  end: Date;
};

function getMonthBucketsInRange(start: Date, end: Date): MonthBucket[] {
  const months: MonthBucket[] = [];
  let current = new Date(start.getFullYear(), start.getMonth(), 1);

  while (current <= end) {
    const monthEnd = new Date(current.getFullYear(), current.getMonth() + 1, 0, 23, 59, 59, 999);
    const bucketStart = new Date(Math.max(current.getTime(), start.getTime()));
    const bucketEnd = new Date(Math.min(monthEnd.getTime(), end.getTime()));

    months.push({
      key: `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, "0")}`,
      label: bucketStart.toLocaleDateString("en-IN", {
        month: "short",
        year: "numeric",
        day: bucketStart.getDate() !== 1 || bucketEnd.getDate() !== monthEnd.getDate() ? "numeric" : undefined,
      }),
      start: bucketStart,
      end: bucketEnd,
    });

    current = new Date(current.getFullYear(), current.getMonth() + 1, 1);
  }

  return months;
}

function getLast12Months(): MonthBucket[] {
  const months: MonthBucket[] = [];
  const now = new Date();

  for (let i = 11; i >= 0; i -= 1) {
    const start = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const end = new Date(now.getFullYear(), now.getMonth() - i + 1, 0, 23, 59, 59, 999);

    months.push({
      key: `${start.getFullYear()}-${String(start.getMonth() + 1).padStart(2, "0")}`,
      label: start.toLocaleDateString("en-IN", { month: "short", year: "numeric" }),
      start,
      end,
    });
  }

  return months;
}

function sumInRange(items: { amount: number; createdAt: Date }[], start: Date, end: Date) {
  return items
    .filter((item) => item.createdAt >= start && item.createdAt <= end)
    .reduce((sum, item) => sum + item.amount, 0);
}

function sumUpTo(items: { amount: number; createdAt: Date }[], end: Date) {
  return items.filter((item) => item.createdAt <= end).reduce((sum, item) => sum + item.amount, 0);
}

export async function getReportData(dateRange?: DateRange | null): Promise<ReportData> {
  const dateWhere = dateRange
    ? {
        createdAt: {
          gte: dateRange.start,
          lte: dateRange.end,
        },
      }
    : undefined;

  const [credits, payments, customers] = await Promise.all([
    prisma.credit.findMany({
      where: dateWhere,
      select: { amount: true, createdAt: true, customerId: true },
    }),
    prisma.payment.findMany({
      where: dateWhere,
      select: { amount: true, createdAt: true, customerId: true },
    }),
    prisma.customer.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    }),
  ]);

  const months = dateRange ? getMonthBucketsInRange(dateRange.start, dateRange.end) : getLast12Months();

  const monthlyCredits = months.map((month) => ({
    month: month.label,
    amount: sumInRange(credits, month.start, month.end),
  }));

  const monthlyPayments = months.map((month) => ({
    month: month.label,
    amount: sumInRange(payments, month.start, month.end),
  }));

  const monthlyOutstanding = months.map((month) => ({
    month: month.label,
    amount: sumUpTo(credits, month.end) - sumUpTo(payments, month.end),
  }));

  const creditByCustomer = new Map<string, number>();
  for (const credit of credits) {
    creditByCustomer.set(credit.customerId, (creditByCustomer.get(credit.customerId) ?? 0) + credit.amount);
  }

  const paymentByCustomer = new Map<string, number>();
  for (const payment of payments) {
    paymentByCustomer.set(payment.customerId, (paymentByCustomer.get(payment.customerId) ?? 0) + payment.amount);
  }

  const customerCredits = customers
    .map((customer) => ({
      name: customer.name,
      amount: creditByCustomer.get(customer.id) ?? 0,
    }))
    .filter((item) => item.amount > 0)
    .sort((a, b) => b.amount - a.amount);

  const customerPayments = customers
    .map((customer) => ({
      name: customer.name,
      amount: paymentByCustomer.get(customer.id) ?? 0,
    }))
    .filter((item) => item.amount > 0)
    .sort((a, b) => b.amount - a.amount);

  return {
    monthlyCredits,
    monthlyPayments,
    monthlyOutstanding,
    customerCredits,
    customerPayments,
  };
}
