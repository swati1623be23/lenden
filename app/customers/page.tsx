import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import Sidebar from "@/components/layout/Sidebar";
import CustomerList, { type CustomerListItem } from "@/components/customers/CustomerList";

async function getCustomers(): Promise<CustomerListItem[]> {
  const customers = await prisma.customer.findMany({
    where: {},
    include: {
      credits: { select: { amount: true } },
      payments: { select: { amount: true } },
    },
    orderBy: { name: "asc" },
  });

  return customers.map((customer) => {
    const totalCredit = customer.credits.reduce((sum, credit) => sum + credit.amount, 0);
    const totalPayment = customer.payments.reduce((sum, payment) => sum + payment.amount, 0);

    return {
      id: customer.id,
      name: customer.name,
      phone: customer.phone,
      address: customer.address,
      outstandingBalance: totalCredit - totalPayment,
    };
  });
}

export default async function CustomersPage() {
  const user = await requireUser();
  const customers = await getCustomers();

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[280px_1fr]">
        <Sidebar shopName={user.shopName} profilePhotoUrl={user.profilePhotoUrl} />
        <section className="rounded-3xl border border-white/10 bg-slate-900/90 p-8 shadow-2xl shadow-slate-950/20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-emerald-400/90">Customers</p>
              <h1 className="mt-3 text-3xl font-semibold text-white">Customer management</h1>
            </div>
            <a
              href="/customers/new"
              className="inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              Add customer
            </a>
          </div>
          <CustomerList customers={customers} />
        </section>
      </div>
    </div>
  );
}
