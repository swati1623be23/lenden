import { requireUser } from "@/lib/auth";
import Sidebar from "@/components/layout/Sidebar";
import ReportsWithFilter from "@/components/reports/ReportsWithFilter";
import { getReportData } from "@/lib/reports/getReportData";
import { parseReportsDateFilter } from "@/lib/dates/dateFilter";

export default async function ReportsPage({
  searchParams,
}: {
  searchParams?: Promise<{ filter?: string; from?: string; to?: string }>;
}) {
  const user = await requireUser();
  const params = await searchParams;
  const dateFilter = parseReportsDateFilter(params ?? {});
  const data = await getReportData(dateFilter.range);

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[280px_1fr]">
        <Sidebar shopName={user.shopName} profilePhotoUrl={user.profilePhotoUrl} />
        <section className="rounded-3xl border border-white/10 bg-slate-900/90 p-8 shadow-2xl shadow-slate-950/20">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-emerald-400/90">Reports</p>
            <h1 className="mt-3 text-3xl font-semibold text-white">Reports & charts</h1>
            <p className="mt-3 text-slate-400">Monthly trends and customer-wise credit and payment summaries for your business.</p>
          </div>

          <ReportsWithFilter
            data={data}
            initialFilter={{
              preset: dateFilter.preset,
              range: dateFilter.range,
              customStart: dateFilter.from ?? "",
              customEnd: dateFilter.to ?? "",
            }}
          />
        </section>
      </div>
    </div>
  );
}
