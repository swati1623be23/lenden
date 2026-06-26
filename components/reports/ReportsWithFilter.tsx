"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DateFilter, { type DateFilterValue } from "@/components/ui/DateFilter";
import ExportButton from "@/components/ui/ExportButton";
import type { DateFilterPreset } from "@/lib/dates/dateFilter";
import { exportReports } from "@/lib/export/exportData";
import type { ReportData } from "@/lib/reports/getReportData";
import ReportsCharts from "@/components/reports/ReportsCharts";

type ReportsWithFilterProps = {
  data: ReportData;
  initialFilter: DateFilterValue;
};

export default function ReportsWithFilter({ data, initialFilter }: ReportsWithFilterProps) {
  const router = useRouter();
  const [dateFilter, setDateFilter] = useState(initialFilter);

  useEffect(() => {
    setDateFilter(initialFilter);
  }, [initialFilter]);

  function handleFilterChange(nextValue: DateFilterValue) {
    setDateFilter(nextValue);

    if (!nextValue.preset) {
      router.replace("/reports");
      return;
    }

    if (nextValue.preset === "custom") {
      if (!nextValue.customStart || !nextValue.customEnd || !nextValue.range) {
        return;
      }

      const params = new URLSearchParams({
        filter: "custom",
        from: nextValue.customStart,
        to: nextValue.customEnd,
      });
      router.replace(`/reports?${params.toString()}`);
      return;
    }

    const params = new URLSearchParams({ filter: nextValue.preset });
    router.replace(`/reports?${params.toString()}`);
  }

  return (
    <>
      <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex-1">
          <DateFilter value={dateFilter} onChange={handleFilterChange} />
        </div>
        <ExportButton onExport={(format) => exportReports(data, format)} />
      </div>
      <ReportsCharts data={data} />
    </>
  );
}
