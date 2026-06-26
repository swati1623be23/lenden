"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { paymentSchema } from "@/lib/validators";
import BsDatePicker from "@/components/ui/BsDatePicker";
import type { PaymentInput } from "@/lib/validators";
import type { Customer } from "@prisma/client";
import toast, { Toaster } from "react-hot-toast";

type PaymentFormProps = {
  heading: string;
  title: string;
  description: string;
  submitLabel: string;
  loadingLabel: string;
  defaultValues?: Partial<PaymentInput>;
  onSubmit: (values: PaymentInput) => Promise<{ ok: boolean; error?: string }>;
};

export default function PaymentForm({
  heading,
  title,
  description,
  submitLabel,
  loadingLabel,
  defaultValues,
  onSubmit,
}: PaymentFormProps) {
  const router = useRouter();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoadingCustomers, setIsLoadingCustomers] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentInput>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      customerId: defaultValues?.customerId ?? "",
      amount: defaultValues?.amount,
      date: defaultValues?.date ?? new Date().toISOString().slice(0, 10),
    },
  });

  useEffect(() => {
    fetch("/api/customers")
      .then((res) => res.json())
      .then((data) => setCustomers(data.customers || []))
      .finally(() => setIsLoadingCustomers(false));
  }, []);

  async function handleFormSubmit(values: PaymentInput) {
    console.log("Payment form values:", values);

    setIsSubmitting(true);
    try {
      const result = await onSubmit(values);
      if (!result.ok) {
        toast.error(result.error || "Unable to save payment.");
        return;
      }
      toast.success(defaultValues?.customerId ? "Payment updated successfully." : "Payment added successfully.");
      router.push("/payments");
      router.refresh();
    } catch {
      toast.error("Unable to save payment.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 sm:px-6 lg:px-10">
      <Toaster position="top-right" />
      <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-slate-900/90 p-8 shadow-2xl shadow-slate-950/20">
        <div className="mb-6">
          <p className="text-sm uppercase tracking-[0.24em] text-emerald-400/90">{heading}</p>
          <h1 className="mt-3 text-3xl font-semibold text-white">{title}</h1>
          <p className="mt-2 text-sm text-slate-400">{description}</p>
        </div>

        {isLoadingCustomers ? (
          <p className="text-sm text-slate-400">Loading customers...</p>
        ) : customers.length === 0 ? (
          <p className="text-sm text-slate-400">No customers found. Add a customer before recording a payment.</p>
        ) : (
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            <label className="block">
              <span className="text-sm font-medium text-slate-200">Customer</span>
              <Controller
                name="customerId"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    value={field.value ?? ""}
                    className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400"
                  >
                    <option value="" disabled>
                      Select a customer
                    </option>
                    {customers.map((customer) => (
                      <option key={customer.id} value={customer.id}>
                        {customer.name}
                      </option>
                    ))}
                  </select>
                )}
              />
              <p className="mt-1 text-sm text-rose-400">{errors.customerId?.message}</p>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-200">Amount</span>
              <input
                type="number"
                step="0.01"
                min="0"
                {...register("amount")}
                className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400"
              />
              <p className="mt-1 text-sm text-rose-400">{errors.amount?.message}</p>
            </label>

            <label className="block">
              <BsDatePicker
              label="Date"
              name="date"
              register={register}
              setValue={setValue}
              value={watch("date")}
              error={errors.date?.message}
            />
          </label>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <a href="/payments" className="text-sm text-slate-400 hover:text-white">
                Back to payments
              </a>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? loadingLabel : submitLabel}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
