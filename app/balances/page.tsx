import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import Sidebar from "@/components/layout/Sidebar";

async function getBalanceData() {
  const customers = await prisma.customer.findMany({
    include: {
      credits: { select: { amount: true } },
      payments: { select: { amount: true } },
    },
    orderBy: { name: "asc" },
  });

  const customerBalances = customers.map((customer) => {
    const totalCredit = customer.credits.reduce((sum, credit) => sum + credit.amount, 0);
    const totalPayment = customer.payments.reduce((sum, payment) => sum + payment.amount, 0);
    return {
      id: customer.id,
      name: customer.name,
      totalCredit,
      totalPayment,
      balance: totalCredit - totalPayment,
    };
  });

  const totalCredit = customerBalances.reduce((sum, item) => sum + item.totalCredit, 0);
  const totalPayment = customerBalances.reduce((sum, item) => sum + item.totalPayment, 0);
  const remaining = totalCredit - totalPayment;

  return { customerBalances, totalCredit, totalPayment, remaining };
}

export default async function BalancePage() {
  const user = await requireUser();
  const { customerBalances, totalCredit, totalPayment, remaining } = await getBalanceData();

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[280px_1fr]">
        <Sidebar shopName={user.shopName} profilePhotoUrl={user.profilePhotoUrl} />
        <section className="rounded-3xl border border-white/10 bg-slate-900/90 p-8 shadow-2xl shadow-slate-950/20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-emerald-400/90">Outstanding balance</p>
              <h1 className="mt-3 text-3xl font-semibold text-white">Customer balances</h1>
            </div>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Total credit</p>
              <p className="mt-4 text-3xl font-semibold text-white">₹{totalCredit.toFixed(2)}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Total payment</p>
              <p className="mt-4 text-3xl font-semibold text-white">₹{totalPayment.toFixed(2)}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Remaining amount</p>
              <p className="mt-4 text-3xl font-semibold text-white">₹{remaining.toFixed(2)}</p>
            </div>
          </div>

          <div className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80">
            <div className="grid grid-cols-[1.6fr_1fr_1fr_1fr] gap-4 border-b border-white/10 bg-slate-900/90 px-6 py-4 text-xs uppercase tracking-[0.24em] text-slate-500">
              <span>Customer</span>
              <span>Total credit</span>
              <span>Total payment</span>
              <span>Outstanding</span>
            </div>
            <div className="divide-y divide-white/5">
              {customerBalances.map((customer) => (
                <div key={customer.id} className="grid grid-cols-[1.6fr_1fr_1fr_1fr] gap-4 px-6 py-4 text-sm text-slate-200">
                  <div>{customer.name}</div>
                  <div>₹{customer.totalCredit.toFixed(2)}</div>
                  <div>₹{customer.totalPayment.toFixed(2)}</div>
                  <div className={customer.balance >= 0 ? "text-emerald-300" : "text-rose-300"}>
                    ₹{customer.balance.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
