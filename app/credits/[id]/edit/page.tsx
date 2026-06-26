import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import Sidebar from "@/components/layout/Sidebar";
import CreditEditForm from "@/components/credits/CreditEditForm";

async function getCredit(id: string) {
  return prisma.credit.findUnique({
    where: { id },
    include: { customer: true },
  });
}

export default async function CreditEditPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireUser();
  const { id } = await params;
  console.log("Loading credit edit page:", id);

  const credit = await getCredit(id);

  if (!credit) {
    return (
      <div className="min-h-screen bg-slate-950 px-4 py-8 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-slate-900/90 p-8 text-center text-slate-300 shadow-2xl shadow-slate-950/20">
          <h1 className="text-3xl font-semibold text-white">Credit not found</h1>
          <p className="mt-4">Please return to the credits list.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[280px_1fr]">
        <Sidebar shopName={user.shopName} profilePhotoUrl={user.profilePhotoUrl} />
        <section className="rounded-3xl border border-white/10 bg-slate-900/90 p-8 shadow-2xl shadow-slate-950/20">
          <CreditEditForm
            credit={{
              id: credit.id,
              amount: credit.amount,
              note: credit.note,
              customerId: credit.customerId,
              createdAt: credit.createdAt.toISOString(),
              customer: {
                id: credit.customer.id,
                name: credit.customer.name,
                phone: credit.customer.phone,
                address: credit.customer.address,
              },
            }}
          />
        </section>
      </div>
    </div>
  );
}
