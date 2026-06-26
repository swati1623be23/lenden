"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import DateFilter, { createEmptyDateFilterValue, type DateFilterValue } from "@/components/ui/DateFilter";
import ExportButton from "@/components/ui/ExportButton";
import { formatBsDate } from "@/lib/dates/bsDate";
import { isDateInRange } from "@/lib/dates/dateFilter";
import { exportPayments } from "@/lib/export/exportData";

export type PaymentListItem = {
  id: string;
  amount: number;
  createdAt: string;
  customerId: string;
  customer: { id: string; name: string };
};

interface PaymentListProps {
  payments: PaymentListItem[];
}

export default function PaymentList({ payments }: PaymentListProps) {
  const router = useRouter();
  const [dateFilter, setDateFilter] = useState<DateFilterValue>(createEmptyDateFilterValue());
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filteredPayments = useMemo(() => {
    if (!dateFilter.range) return payments;
    return payments.filter((payment) => isDateInRange(payment.createdAt, dateFilter.range!));
  }, [payments, dateFilter.range]);

  async function handleDelete(id: string) {
    if (!confirm("Delete this payment record?")) return;

    console.log("Deleting payment:", id);
    setDeletingId(id);

    try {
      const response = await fetch(`/api/payments/${id}`, { method: "DELETE" });
      const result = await response.json();
      console.log("Delete payment response:", response.status, result);

      if (!response.ok) {
        toast.error(result.error || "Unable to delete payment.");
        return;
      }

      toast.success("Payment deleted.");
      router.refresh();
    } catch (error) {
      console.error("Delete payment error:", error);
      toast.error("Unable to delete payment.");
    } finally {
      setDeletingId(null);
    }
  }

  if (payments.length === 0) {
    return <p className="mt-8 text-sm text-slate-400">No payments recorded yet. Add payment received from customers.</p>;
  }

  return (
    <div className="mt-8 space-y-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex-1">
          <DateFilter value={dateFilter} onChange={setDateFilter} />
        </div>
        <ExportButton
          onExport={(format) => exportPayments(filteredPayments, format)}
          disabled={filteredPayments.length === 0}
        />
      </div>

      {filteredPayments.length === 0 ? (
        <p className="text-sm text-slate-400">No payments found for the selected date range.</p>
      ) : (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80">
      <div className="grid grid-cols-[1.5fr_1fr_1fr_auto] gap-4 border-b border-white/10 bg-slate-900/90 px-6 py-4 text-xs uppercase tracking-[0.24em] text-slate-500">
        <span>Customer</span>
        <span>Amount</span>
        <span>Date</span>
        <span className="text-right">Actions</span>
      </div>
      <div className="divide-y divide-white/5">
        {filteredPayments.map((payment) => (
          <div key={payment.id} className="grid grid-cols-[1.5fr_1fr_1fr_auto] gap-4 px-6 py-4 text-sm text-slate-200">
            <div>{payment.customer.name}</div>
            <div>₹{payment.amount.toFixed(2)}</div>
            <div>
              <div>{new Date(payment.createdAt).toLocaleDateString()}</div>
              <div className="text-xs text-slate-400">{formatBsDate(payment.createdAt)}</div>
            </div>
            <div className="flex items-center justify-end gap-2">
              <Link
                href={`/payments/${payment.id}/edit`}
                className="rounded-2xl border border-slate-700 px-3 py-2 text-xs font-semibold text-slate-300 transition hover:border-emerald-400 hover:text-white"
              >
                Edit
              </Link>
              <button
                type="button"
                onClick={() => handleDelete(payment.id)}
                disabled={deletingId === payment.id}
                className="rounded-2xl border border-rose-500/20 px-3 py-2 text-xs font-semibold text-rose-300 transition hover:bg-rose-500/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {deletingId === payment.id ? "Deleting..." : "Delete"}
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
