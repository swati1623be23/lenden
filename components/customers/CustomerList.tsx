"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { buildReminderMessage, buildWhatsAppReminderUrl } from "@/lib/whatsapp";
import { TextInput } from "@/components/ui/FormField";
import ExportButton from "@/components/ui/ExportButton";
import { exportCustomers } from "@/lib/export/exportData";

export type CustomerListItem = {
  id: string;
  name: string;
  phone: string | null;
  address: string | null;
  outstandingBalance: number;
};

interface CustomerListProps {
  customers: CustomerListItem[];
}

export default function CustomerList({ customers }: CustomerListProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const filteredCustomers = useMemo(() => {
    const term = searchQuery.trim().toLowerCase();
    if (!term) return customers;

    return customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(term) ||
        (customer.phone?.toLowerCase().includes(term) ?? false),
    );
  }, [customers, searchQuery]);

  async function handleDelete(id: string) {
    if (!confirm("Delete this customer?")) return;

    console.log("Deleting customer:", id);
    setDeletingId(id);

    try {
      const response = await fetch(`/api/customers/${id}`, { method: "DELETE" });
      const result = await response.json();
      console.log("Delete customer response:", response.status, result);

      if (!response.ok) {
        toast.error(result.error || "Unable to delete customer.");
        return;
      }

      toast.success("Customer deleted.");
      router.refresh();
    } catch (error) {
      console.error("Delete customer error:", error);
      toast.error("Unable to delete customer.");
    } finally {
      setDeletingId(null);
    }
  }

  async function handleDownloadStatement(id: string, name: string) {
    setDownloadingId(id);

    try {
      const response = await fetch(`/api/customers/${id}/statement`);

      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        toast.error(result.error || "Unable to generate statement.");
        return;
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${name.replace(/[^a-zA-Z0-9_-]/g, "_")}_statement.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);

      toast.success("Statement downloaded.");
    } catch (error) {
      console.error("Download statement error:", error);
      toast.error("Unable to generate statement.");
    } finally {
      setDownloadingId(null);
    }
  }

  function handleEditCustomer(id: string) {
    router.push(`/customers/${id}/edit`);
  }

  function handleWhatsAppReminder(customer: CustomerListItem) {
    if (!customer.phone) {
      toast.error("Phone number not available for this customer.");
      return;
    }

    const message = buildReminderMessage(customer.name, customer.outstandingBalance);
    const url = buildWhatsAppReminderUrl(customer.phone, message);

    if (!url) {
      toast.error("Invalid phone number for this customer.");
      return;
    }

    window.open(url, "_blank", "noopener,noreferrer");
  }

  if (customers.length === 0) {
    return <p className="mt-8 text-sm text-slate-400">No customers found. Add your first customer to get started.</p>;
  }

  return (
    <div className="mt-8 space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          <TextInput
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search by name or phone number..."
            aria-label="Search customers by name or phone number"
          />
        </div>
        <ExportButton
          onExport={(format) => exportCustomers(filteredCustomers, format)}
          disabled={filteredCustomers.length === 0}
        />
      </div>

      {filteredCustomers.length === 0 ? (
        <p className="text-sm text-slate-400">No customers match your search.</p>
      ) : (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80">
      <div className="grid grid-cols-[1.5fr_1fr_1fr_auto] gap-4 border-b border-white/10 bg-slate-900/90 px-6 py-4 text-xs uppercase tracking-[0.24em] text-slate-500">
        <span>Name</span>
        <span>Phone</span>
        <span>Address</span>
        <span className="text-right">Actions</span>
      </div>
      <div className="divide-y divide-white/5">
        {filteredCustomers.map((customer) => (
          <div key={customer.id} className="grid grid-cols-[1.5fr_1fr_1fr_auto] gap-4 px-6 py-4 text-sm text-slate-200">
            <div>{customer.name}</div>
            <div>{customer.phone || "—"}</div>
            <div>{customer.address || "—"}</div>
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => handleDownloadStatement(customer.id, customer.name)}
                disabled={downloadingId === customer.id}
                className="rounded-2xl border border-emerald-500/30 px-3 py-2 text-xs font-semibold text-emerald-300 transition hover:border-emerald-400 hover:bg-emerald-500/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {downloadingId === customer.id ? "Generating..." : "PDF"}
              </button>
              <button
                type="button"
                onClick={() => handleWhatsAppReminder(customer)}
                className="rounded-2xl border border-green-500/30 px-3 py-2 text-xs font-semibold text-green-300 transition hover:border-green-400 hover:bg-green-500/10"
              >
                WhatsApp
              </button>
              <button
                type="button"
                onClick={() => handleEditCustomer(customer.id)}
                className="rounded-2xl border border-slate-700 px-3 py-2 text-xs font-semibold text-slate-300 transition hover:border-emerald-400 hover:text-white"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => handleDelete(customer.id)}
                disabled={deletingId === customer.id}
                className="rounded-2xl border border-rose-500/20 px-3 py-2 text-xs font-semibold text-rose-300 transition hover:bg-rose-500/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {deletingId === customer.id ? "Deleting..." : "Delete"}
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
