"use client";

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { creditSchema } from "@/lib/validators";
import BsDatePicker from "@/components/ui/BsDatePicker";
import type { CreditInput } from "@/lib/validators";
import type { Customer } from "@prisma/client";
import toast, { Toaster } from "react-hot-toast";

export type CreditEditData = {
  id: string;
  amount: number;
  note: string | null;
  customerId: string;
  createdAt: string;
  customer: { id: string; name: string; phone: string | null; address: string | null };
};

interface CreditEditFormProps {
  credit: CreditEditData;
}

export default function CreditEditForm({ credit }: CreditEditFormProps) {
  const router = useRouter();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<CreditInput>({
    resolver: zodResolver(creditSchema),
    defaultValues: {
      customerId: credit.customerId,
      amount: credit.amount,
      note: credit.note || "",
      date: new Date(credit.createdAt).toISOString().slice(0, 10),
    },
  });

  useEffect(() => {
    fetch("/api/customers")
      .then((res) => res.json())
      .then((data) => setCustomers(data.customers || []));
  }, []);

  async function onSubmit(values: CreditInput) {
    console.log("Updating credit:", credit.id, values);
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/credits/${credit.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = await response.json();
      console.log("Update credit response:", response.status, result);

      if (!response.ok) {
        toast.error(result.error || "Unable to update credit.");
        return;
      }

      toast.success("Credit updated successfully.");
      router.push("/credits");
      router.refresh();
    } catch (error) {
      console.error("Update credit error:", error);
      toast.error("Unable to update credit.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <Toaster position="top-right" />
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.24em] text-emerald-400/90">Edit credit</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">Update udhaar</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
            {isSubmitting ? "Updating..." : "Update credit"}
          </button>
        </div>
      </form>
    </div>
  );
}
