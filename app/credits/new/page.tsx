"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { creditSchema } from "@/lib/validators";
import BsDatePicker from "@/components/ui/BsDatePicker";
import type { CreditInput } from "@/lib/validators";
import type { Customer } from "@prisma/client";
import toast, { Toaster } from "react-hot-toast";

export default function NewCreditPage() {
  const router = useRouter();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<CreditInput>({
    resolver: zodResolver(creditSchema),
    defaultValues: { date: new Date().toISOString().slice(0, 10) },
  });

  useEffect(() => {
    fetch("/api/customers")
      .then((res) => res.json())
      .then((data) => setCustomers(data.customers || []));
  }, []);

  async function onSubmit(values: CreditInput) {
    setIsSubmitting(true);
    const response = await fetch("/api/credits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const result = await response.json();
    setIsSubmitting(false);

    if (!response.ok) {
      toast.error(result.error || "Unable to add credit.");
      return;
    }

    toast.success("Credit added successfully.");
    router.push("/credits");
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 sm:px-6 lg:px-10">
      <Toaster position="top-right" />
      <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-slate-900/90 p-8 shadow-2xl shadow-slate-950/20">
        <div className="mb-6">
          <p className="text-sm uppercase tracking-[0.24em] text-emerald-400/90">New credit</p>
          <h1 className="mt-3 text-3xl font-semibold text-white">Add udhaar</h1>
          <p className="mt-2 text-sm text-slate-400">Record credit extended to a customer.</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <label className="block">
            <span className="text-sm font-medium text-slate-200">Customer</span>
            <select
              {...register("customerId")}
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400"
            >
              <option value="">Select a customer</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
            <p className="mt-1 text-sm text-rose-400">{errors.customerId?.message}</p>
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-200">Amount</span>
            <input
              type="number"
              step="0.01"
              {...register("amount", { valueAsNumber: true })}
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400"
            />
            <p className="mt-1 text-sm text-rose-400">{errors.amount?.message}</p>
          </label>
          <BsDatePicker
            label="Date"
            name="date"
            register={register}
            setValue={setValue}
            value={watch("date")}
            error={errors.date?.message}
          />
          <label className="block">
            <span className="text-sm font-medium text-slate-200">Note</span>
            <textarea
              {...register("note")}
              rows={3}
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400"
            />
            <p className="mt-1 text-sm text-rose-400">{errors.note?.message}</p>
          </label>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <a href="/credits" className="text-sm text-slate-400 hover:text-white">
              Back to credits
            </a>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : "Save credit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
