"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { customerSchema } from "@/lib/validators";
import type { CustomerInput } from "@/lib/validators";
import toast, { Toaster } from "react-hot-toast";

export default function NewCustomerPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerInput>({ resolver: zodResolver(customerSchema) });

  async function onSubmit(values: CustomerInput) {
    setIsSubmitting(true);
    const response = await fetch("/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const result = await response.json();
    setIsSubmitting(false);

    if (!response.ok) {
      toast.error(result.error || "Unable to add customer.");
      return;
    }

    toast.success("Customer added successfully.");
    router.push("/customers");
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 sm:px-6 lg:px-10">
      <Toaster position="top-right" />
      <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-slate-900/90 p-8 shadow-2xl shadow-slate-950/20">
        <div className="mb-6">
          <p className="text-sm uppercase tracking-[0.24em] text-emerald-400/90">New customer</p>
          <h1 className="mt-3 text-3xl font-semibold text-white">Add customer</h1>
          <p className="mt-2 text-sm text-slate-400">Create a new customer record for credit and payment tracking.</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <label className="block">
            <span className="text-sm font-medium text-slate-200">Name</span>
            <input
              type="text"
              {...register("name")}
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400"
            />
            <p className="mt-1 text-sm text-rose-400">{errors.name?.message}</p>
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-200">Phone</span>
            <input
              type="text"
              {...register("phone")}
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400"
            />
            <p className="mt-1 text-sm text-rose-400">{errors.phone?.message}</p>
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-200">Address</span>
            <textarea
              {...register("address")}
              rows={4}
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400"
            />
            <p className="mt-1 text-sm text-rose-400">{errors.address?.message}</p>
          </label>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <a href="/customers" className="text-sm text-slate-400 hover:text-white">
              Back to customers
            </a>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : "Save customer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
