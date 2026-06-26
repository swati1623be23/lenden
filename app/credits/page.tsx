import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import Sidebar from "@/components/layout/Sidebar";
import CreditList, { type CreditListItem } from "@/components/credits/CreditList";

async function getCredits(): Promise<CreditListItem[]> {
  const credits = await prisma.credit.findMany({
    orderBy: { createdAt: "desc" },
    include: { customer: { select: { id: true, name: true } } },
  });

  return credits.map((credit) => ({
    id: credit.id,
    amount: credit.amount,
    note: credit.note,
    createdAt: credit.createdAt.toISOString(),
    customerId: credit.customerId,
    customer: credit.customer,
  }));
}

export default async function CreditsPage() {
  const user = await requireUser();
  const credits = await getCredits();

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[280px_1fr]">
        <Sidebar shopName={user.shopName} profilePhotoUrl={user.profilePhotoUrl} />
        <section className="rounded-3xl border border-white/10 bg-slate-900/90 p-8 shadow-2xl shadow-slate-950/20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-emerald-400/90">Credits</p>
              <h1 className="mt-3 text-3xl font-semibold text-white">Credit entries</h1>
            </div>
            <a
              href="/credits/new"
              className="inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              Add credit
            </a>
          </div>
          <CreditList credits={credits} />
        </section>
      </div>
    </div>
  );
}
