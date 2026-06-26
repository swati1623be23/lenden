"use client";

import PaymentForm from "@/components/payments/PaymentForm";
import type { PaymentInput } from "@/lib/validators";
import { parseJSONResponse } from "@/lib/fetch";

export type PaymentEditData = {
  id: string;
  amount: number;
  customerId: string;
  createdAt: string;
  customer: { id: string; name: string; phone: string | null; address: string | null };
};

interface PaymentEditFormProps {
  payment: PaymentEditData;
}

export default function PaymentEditForm({ payment }: PaymentEditFormProps) {
  async function handleSubmit(values: PaymentInput) {
    console.log("Updating payment:", payment.id, values);

    const response = await fetch(`/api/payments/${payment.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const result = await parseJSONResponse(response);
    console.log("Update payment response:", response.status, result);

    return {
      ok: response.ok,
      error: typeof result?.error === "string" ? result.error : undefined,
    };
  }

  return (
    <PaymentForm
      heading="Edit payment"
      title="Update payment"
      description="Update payment details for this customer."
      submitLabel="Update payment"
      loadingLabel="Updating..."
      defaultValues={{
        customerId: payment.customerId,
        amount: payment.amount,
        date: new Date(payment.createdAt).toISOString().slice(0, 10),
      }}
      onSubmit={handleSubmit}
    />
  );
}
