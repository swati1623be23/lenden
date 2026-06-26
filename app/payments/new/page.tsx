"use client";

import PaymentForm from "@/components/payments/PaymentForm";
import type { PaymentInput } from "@/lib/validators";
import { parseJSONResponse } from "@/lib/fetch";

export default function NewPaymentPage() {
  async function handleSubmit(values: PaymentInput) {
    const response = await fetch("/api/payments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const result = await parseJSONResponse(response);
    return {
      ok: response.ok,
      error: typeof result?.error === "string" ? result.error : undefined,
    };
  }

  return (
    <PaymentForm
      heading="New payment"
      title="Record payment"
      description="Log a payment received from a customer."
      submitLabel="Save payment"
      loadingLabel="Saving..."
      onSubmit={handleSubmit}
    />
  );
}
