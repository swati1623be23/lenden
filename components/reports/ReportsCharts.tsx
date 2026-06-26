"use client";

import type { ReactNode } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ReportData } from "@/lib/reports/getReportData";

type ReportsChartsProps = {
  data: ReportData;
};

const chartColors = {
  credit: "#34d399",
  payment: "#38bdf8",
  outstanding: "#fbbf24",
  grid: "#334155",
  axis: "#94a3b8",
  tooltipBg: "#0f172a",
  tooltipBorder: "#334155",
};

function formatCurrency(value: number) {
  return `₹${value.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 shadow-xl">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{label}</p>
      <p className="mt-2 text-sm font-semibold text-white">{formatCurrency(payload[0].value)}</p>
    </div>
  );
}

function ChartCard({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
      <p className="text-sm uppercase tracking-[0.24em] text-emerald-400/90">{title}</p>
      <p className="mt-2 text-sm text-slate-400">{description}</p>
      <div className="mt-6 h-72 w-full">{children}</div>
    </div>
  );
}

function EmptyChartMessage() {
  return (
    <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-white/10 bg-slate-900/40">
      <p className="text-sm text-slate-500">No data available yet.</p>
    </div>
  );
}

export default function ReportsCharts({ data }: ReportsChartsProps) {
  const hasMonthlyData =
    data.monthlyCredits.some((item) => item.amount > 0) ||
    data.monthlyPayments.some((item) => item.amount > 0) ||
    data.monthlyOutstanding.some((item) => item.amount !== 0);

  const customerCreditHeight = Math.max(280, data.customerCredits.length * 48);
  const customerPaymentHeight = Math.max(280, data.customerPayments.length * 48);

  return (
    <div className="mt-10 space-y-8">
      <div className="grid gap-6 xl:grid-cols-2">
        <ChartCard title="Monthly credit" description="Total credit issued per month (last 12 months).">
          {hasMonthlyData ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.monthlyCredits} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid stroke={chartColors.grid} strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: chartColors.axis, fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis
                  tick={{ fill: chartColors.axis, fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `₹${value}`}
                />
                <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
                <Bar dataKey="amount" fill={chartColors.credit} radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <EmptyChartMessage />
          )}
        </ChartCard>

        <ChartCard title="Monthly payment" description="Total payments received per month (last 12 months).">
          {hasMonthlyData ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.monthlyPayments} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid stroke={chartColors.grid} strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: chartColors.axis, fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis
                  tick={{ fill: chartColors.axis, fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `₹${value}`}
                />
                <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
                <Bar dataKey="amount" fill={chartColors.payment} radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <EmptyChartMessage />
          )}
        </ChartCard>
      </div>

      <ChartCard title="Outstanding balance" description="Running outstanding balance at the end of each month.">
        {hasMonthlyData ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.monthlyOutstanding} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="outstandingGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={chartColors.outstanding} stopOpacity={0.35} />
                  <stop offset="95%" stopColor={chartColors.outstanding} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke={chartColors.grid} strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: chartColors.axis, fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fill: chartColors.axis, fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `₹${value}`}
              />
              <Tooltip content={<ChartTooltip />} cursor={{ stroke: chartColors.outstanding, strokeWidth: 1 }} />
              <Area
                type="monotone"
                dataKey="amount"
                stroke={chartColors.outstanding}
                fill="url(#outstandingGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <EmptyChartMessage />
        )}
      </ChartCard>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
          <p className="text-sm uppercase tracking-[0.24em] text-emerald-400/90">Customer-wise credit</p>
          <p className="mt-2 text-sm text-slate-400">Total credit issued per customer.</p>
          <div className="mt-6 w-full" style={{ height: customerCreditHeight }}>
            {data.customerCredits.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.customerCredits} layout="vertical" margin={{ top: 8, right: 16, left: 8, bottom: 0 }}>
                  <CartesianGrid stroke={chartColors.grid} strokeDasharray="3 3" horizontal={false} />
                  <XAxis
                    type="number"
                    tick={{ fill: chartColors.axis, fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => `₹${value}`}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={120}
                    tick={{ fill: chartColors.axis, fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
                  <Bar dataKey="amount" fill={chartColors.credit} radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <EmptyChartMessage />
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
          <p className="text-sm uppercase tracking-[0.24em] text-emerald-400/90">Customer-wise payment</p>
          <p className="mt-2 text-sm text-slate-400">Total payments received per customer.</p>
          <div className="mt-6 w-full" style={{ height: customerPaymentHeight }}>
            {data.customerPayments.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.customerPayments} layout="vertical" margin={{ top: 8, right: 16, left: 8, bottom: 0 }}>
                  <CartesianGrid stroke={chartColors.grid} strokeDasharray="3 3" horizontal={false} />
                  <XAxis
                    type="number"
                    tick={{ fill: chartColors.axis, fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => `₹${value}`}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={120}
                    tick={{ fill: chartColors.axis, fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
                  <Bar dataKey="amount" fill={chartColors.payment} radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <EmptyChartMessage />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
