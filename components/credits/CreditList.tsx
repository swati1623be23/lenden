"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import DateFilter, { createEmptyDateFilterValue, type DateFilterValue } from "@/components/ui/DateFilter";
import ExportButton from "@/components/ui/ExportButton";
import { formatBsDate } from "@/lib/dates/bsDate";
import { isDateInRange } from "@/lib/dates/dateFilter";
import { exportCredits } from "@/lib/export/exportData";

export type CreditListItem = {
  id: string;
  amount: number;
  note: string | null;
  createdAt: string;
  customerId: string;
  customer: { id: string; name: string };
};

interface CreditListProps {
  credits: CreditListItem[];
}

export default function CreditList({ credits }: CreditListProps) {
  const router = useRouter();
  const [dateFilter, setDateFilter] = useState<DateFilterValue>(createEmptyDateFilterValue());
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filteredCredits = useMemo(() => {
    if (!dateFilter.range) return credits;
    return credits.filter((credit) => isDateInRange(credit.createdAt, dateFilter.range!));
  }, [credits, dateFilter.range]);

  async function handleDelete(id: string) {
    if (!confirm("Delete this credit record?")) return;

    console.log("Deleting credit:", id);
    setDeletingId(id);

    try {
      const response = await fetch(`/api/credits/${id}`, { method: "DELETE" });
      const result = await response.json();
      console.log("Delete credit response:", response.status, result);

      if (!response.ok) {
        toast.error(result.error || "Unable to delete credit.");
        return;
      }

      toast.success("Credit deleted.");
      router.refresh();
    } catch (error) {
      console.error("Delete credit error:", error);
      toast.error("Unable to delete credit.");
    } finally {
      setDeletingId(null);
    }
  }

  function handleEditCredit(id: string) {
    router.push(`/credits/${id}/edit`);
  }

  if (credits.length === 0) {
    return <p className="mt-8 text-sm text-slate-400">No credits recorded yet. Add a credit for a customer.</p>;
  }

  return (
    <div className="mt-8 space-y-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex-1">
          <DateFilter value={dateFilter} onChange={setDateFilter} />
        </div>
        <ExportButton
          onExport={(format) => exportCredits(filteredCredits, format)}
          disabled={filteredCredits.length === 0}
        />
      </div>

      {filteredCredits.length === 0 ? (
        <p className="text-sm text-slate-400">No credits found for the selected date range.</p>
      ) : (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80">
      <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr_auto] gap-4 border-b border-white/10 bg-slate-900/90 px-6 py-4 text-xs uppercase tracking-[0.24em] text-slate-500">
        <span>Customer</span>
        <span>Amount</span>
        <span>Date</span>
        <span>Note</span>
        <span className="text-right">Actions</span>
      </div>
      <div className="divide-y divide-white/5">
        {filteredCredits.map((credit) => (
          <div key={credit.id} className="grid grid-cols-[1.4fr_1fr_1fr_1fr_auto] gap-4 px-6 py-4 text-sm text-slate-200">
            <div>{credit.customer.name}</div>
            <div>₹{credit.amount.toFixed(2)}</div>
            <div>
              <div>{new Date(credit.createdAt).toLocaleDateString()}</div>
              <div className="text-xs text-slate-400">{formatBsDate(credit.createdAt)}</div>
            </div>
            <div>{credit.note || "—"}</div>
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => handleEditCredit(credit.id)}
                className="rounded-2xl border border-slate-700 px-3 py-2 text-xs font-semibold text-slate-300 transition hover:border-emerald-400 hover:text-white"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => handleDelete(credit.id)}
                disabled={deletingId === credit.id}
                className="rounded-2xl border border-rose-500/20 px-3 py-2 text-xs font-semibold text-rose-300 transition hover:bg-rose-500/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {deletingId === credit.id ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
      )}
    </div>
  );
}
