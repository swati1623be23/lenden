import { cookies } from "next/headers";
import { requireUser } from "@/lib/auth";
import Sidebar from "@/components/layout/Sidebar";
import { prisma } from "@/lib/prisma";
import { translate } from "@/lib/i18n";
import { getLocaleFromCookies } from "@/lib/serverLocale";

async function getStats() {
  const customers = await prisma.customer.count();
  const totalCredits = await prisma.credit.aggregate({ _sum: { amount: true } });
  const totalPayments = await prisma.payment.aggregate({ _sum: { amount: true } });
  return {
    customers,
    totalCredits: totalCredits._sum.amount ?? 0,
    totalPayments: totalPayments._sum.amount ?? 0,
    remaining: (totalCredits._sum.amount ?? 0) - (totalPayments._sum.amount ?? 0),
  };
}

export default async function DashboardPage() {
  const user = await requireUser();
  const stats = await getStats();

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[280px_1fr]">
        <Sidebar shopName={user.shopName} profilePhotoUrl={user.profilePhotoUrl} />
        <section className="rounded-3xl border border-white/10 bg-slate-900/90 p-8 shadow-2xl shadow-slate-950/20">
          <div className="flex flex-col gap-3">
            <div className="inline-flex rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-300">
              Quick overview
            </div>
            <h1 className="text-3xl font-semibold text-white">Dashboard</h1>
            <p className="text-slate-400">Review total customers, credit amount, payment amount, and outstanding balance.</p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6 min-w-0 overflow-hidden">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Customers</p>
              <p className="mt-4 text-2xl sm:text-3xl xl:text-4xl font-semibold text-white break-words">{stats.customers}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6 min-w-0 overflow-hidden">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Total credit</p>
              <p className="mt-4 text-2xl sm:text-3xl xl:text-4xl font-semibold text-white break-words">₹{stats.totalCredits.toFixed(2)}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6 min-w-0 overflow-hidden">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Total payment</p>
              <p className="mt-4 text-2xl sm:text-3xl xl:text-4xl font-semibold text-white break-words">₹{stats.totalPayments.toFixed(2)}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6 min-w-0 overflow-hidden">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Outstanding</p>
              <p className="mt-4 text-2xl sm:text-3xl xl:text-4xl font-semibold text-white break-words">₹{stats.remaining.toFixed(2)}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
