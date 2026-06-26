import * as XLSX from "xlsx";
import type { CustomerListItem } from "@/components/customers/CustomerList";
import type { CreditListItem } from "@/components/credits/CreditList";
import type { PaymentListItem } from "@/components/payments/PaymentList";
import type { ReportData } from "@/lib/reports/getReportData";

export type ExportFormat = "csv" | "xlsx";

type ExportRow = Record<string, string | number | null | undefined>;

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-IN");
}

function formatAmount(value: number) {
  return Number(value.toFixed(2));
}

function downloadWorkbook(workbook: XLSX.WorkBook, filename: string, format: ExportFormat) {
  const bookType = format === "csv" ? "csv" : "xlsx";
  const extension = format === "csv" ? "csv" : "xlsx";
  XLSX.writeFile(workbook, `${filename}.${extension}`, { bookType });
}

function createWorkbookFromSheets(sheets: { name: string; rows: ExportRow[] }[]) {
  const workbook = XLSX.utils.book_new();

  for (const sheet of sheets) {
    const worksheet = XLSX.utils.json_to_sheet(sheet.rows);
    XLSX.utils.book_append_sheet(workbook, worksheet, sheet.name.slice(0, 31));
  }

  return workbook;
}

function createCsvWorkbookFromSheets(sheets: { name: string; rows: ExportRow[] }[]) {
  const combined: ExportRow[] = [];

  for (const sheet of sheets) {
    if (combined.length > 0) {
      combined.push({});
    }
    combined.push({ Section: sheet.name });
    combined.push(...sheet.rows);
  }

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(combined);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
  return workbook;
}

function exportSheets(sheets: { name: string; rows: ExportRow[] }[], filename: string, format: ExportFormat) {
  const workbook = format === "csv" ? createCsvWorkbookFromSheets(sheets) : createWorkbookFromSheets(sheets);
  downloadWorkbook(workbook, filename, format);
}

export function exportCustomers(customers: CustomerListItem[], format: ExportFormat) {
  const rows: ExportRow[] = customers.map((customer) => ({
    Name: customer.name,
    Phone: customer.phone ?? "",
    Address: customer.address ?? "",
    "Outstanding Balance": formatAmount(customer.outstandingBalance),
  }));

  exportSheets([{ name: "Customers", rows }], "customers", format);
}

export function exportCredits(credits: CreditListItem[], format: ExportFormat) {
  const rows: ExportRow[] = credits.map((credit) => ({
    Customer: credit.customer.name,
    Amount: formatAmount(credit.amount),
    Date: formatDate(credit.createdAt),
    Note: credit.note ?? "",
  }));

  exportSheets([{ name: "Credits", rows }], "credits", format);
}

export function exportPayments(payments: PaymentListItem[], format: ExportFormat) {
  const rows: ExportRow[] = payments.map((payment) => ({
    Customer: payment.customer.name,
    Amount: formatAmount(payment.amount),
    Date: formatDate(payment.createdAt),
  }));

  exportSheets([{ name: "Payments", rows }], "payments", format);
}

export function exportReports(data: ReportData, format: ExportFormat) {
  exportSheets(
    [
      {
        name: "Monthly Credits",
        rows: data.monthlyCredits.map((item) => ({
          Month: item.month,
          Amount: formatAmount(item.amount),
        })),
      },
      {
        name: "Monthly Payments",
        rows: data.monthlyPayments.map((item) => ({
          Month: item.month,
          Amount: formatAmount(item.amount),
        })),
      },
      {
        name: "Outstanding Balance",
        rows: data.monthlyOutstanding.map((item) => ({
          Month: item.month,
          Amount: formatAmount(item.amount),
        })),
      },
      {
        name: "Customer Credits",
        rows: data.customerCredits.map((item) => ({
          Customer: item.name,
          Amount: formatAmount(item.amount),
        })),
      },
      {
        name: "Customer Payments",
        rows: data.customerPayments.map((item) => ({
          Customer: item.name,
          Amount: formatAmount(item.amount),
        })),
      },
    ],
    "reports",
    format,
  );
}
