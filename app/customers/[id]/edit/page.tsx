import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import Sidebar from "@/components/layout/Sidebar";
import CustomerEditForm from "@/components/customers/CustomerEditForm";

async function getCustomer(id: string) {
  return prisma.customer.findUnique({ where: { id } });
}

export default async function CustomerEditPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireUser();
  const { id } = await params;
  console.log("Loading customer edit page:", id);

  const customer = await getCustomer(id);

  if (!customer) {
    return (
      <div className="min-h-screen bg-slate-950 px-4 py-8 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-slate-900/90 p-8 text-center text-slate-300 shadow-2xl shadow-slate-950/20">
          <h1 className="text-3xl font-semibold text-white">Customer not found</h1>
          <p className="mt-4">Please return to the customer list.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[280px_1fr]">
        <Sidebar shopName={user.shopName} profilePhotoUrl={user.profilePhotoUrl} />
        <section className="rounded-3xl border border-white/10 bg-slate-900/90 p-8 shadow-2xl shadow-slate-950/20">
          <CustomerEditForm
            customer={{
              id: customer.id,
              name: customer.name,
              phone: customer.phone,
              address: customer.address,
            }}
          />
        </section>
      </div>
    </div>
  );
}
