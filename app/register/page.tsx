"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast, { Toaster } from "react-hot-toast";
import AuthCard from "@/components/auth/AuthCard";
import { FormField, SubmitButton, TextInput } from "@/components/ui/FormField";
import { registerSchema } from "@/lib/validators";
import type { RegisterInput } from "@/lib/validators";
import { parseJSONResponse } from "@/lib/fetch";

export default function RegisterPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({ resolver: zodResolver(registerSchema) });

  async function onSubmit(values: RegisterInput) {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const result = await parseJSONResponse(response);
      if (!response.ok) {
        toast.error(typeof result?.error === "string" ? result.error : "Unable to register.");
        return;
      }

      toast.success("Account created successfully.");
      router.push("/dashboard");
      router.refresh();
    } catch {
      toast.error("Unable to register. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Toaster position="top-right" />
      <AuthCard
        title="Create your account"
        description="Register to start tracking credits and payments."
        footer={
          <>
            Already have an account?{" "}
            <Link href="/login" className="text-emerald-400 hover:text-emerald-300">
              Login
            </Link>
          </>
        }
      >
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="space-y-4">
            <FormField label="Name" error={errors.name?.message}>
              <TextInput type="text" autoComplete="name" {...register("name")} />
            </FormField>
            <FormField label="Email" error={errors.email?.message}>
              <TextInput type="email" autoComplete="email" {...register("email")} />
            </FormField>
            <FormField label="Password" error={errors.password?.message}>
              <TextInput type="password" autoComplete="new-password" {...register("password")} />
            </FormField>
          </div>
          <SubmitButton isLoading={isSubmitting} loadingLabel="Creating account..." label="Register" />
        </form>
      </AuthCard>
    </>
  );
}
