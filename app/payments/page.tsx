import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import Sidebar from "@/components/layout/Sidebar";
import PaymentList, { type PaymentListItem } from "@/components/payments/PaymentList";

async function getPayments(): Promise<PaymentListItem[]> {
  const payments = await prisma.payment.findMany({
    orderBy: { createdAt: "desc" },
    include: { customer: { select: { id: true, name: true } } },
  });

  return payments.map((payment) => ({
    id: payment.id,
    amount: payment.amount,
    createdAt: payment.createdAt.toISOString(),
    customerId: payment.customerId,
    customer: payment.customer,
  }));
}

export default async function PaymentsPage() {
  const user = await requireUser();
  const payments = await getPayments();

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[280px_1fr]">
        <Sidebar shopName={user.shopName} profilePhotoUrl={user.profilePhotoUrl} />
        <section className="rounded-3xl border border-white/10 bg-slate-900/90 p-8 shadow-2xl shadow-slate-950/20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-emerald-400/90">Payments</p>
              <h1 className="mt-3 text-3xl font-semibold text-white">Payment history</h1>
            </div>
            <a
              href="/payments/new"
              className="inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              Add payment
            </a>
          </div>
          <PaymentList payments={payments} />
        </section>
      </div>
    </div>
  );
}
