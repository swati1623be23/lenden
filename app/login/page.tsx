"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast, { Toaster } from "react-hot-toast";
import AuthCard from "@/components/auth/AuthCard";
import { FormField, SubmitButton, TextInput } from "@/components/ui/FormField";
import { loginSchema } from "@/lib/validators";
import type { LoginInput } from "@/lib/validators";
import { parseJSONResponse } from "@/lib/fetch";

export default function LoginPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  async function onSubmit(values: LoginInput) {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const result = await parseJSONResponse(response);
      if (!response.ok) {
        toast.error(typeof result?.error === "string" ? result.error : "Unable to log in.");
        return;
      }

      toast.success("Logged in successfully.");
      router.push("/dashboard");
      router.refresh();
    } catch {
      toast.error("Unable to log in. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Toaster position="top-right" />
      <AuthCard
        title="Welcome Back"
        description="Sign in to access LenDen credit management."
        footer={
          <>
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-emerald-400 hover:text-emerald-300">
              Register
            </Link>
          </>
        }
      >
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="space-y-4">
            <FormField label="Email" error={errors.email?.message}>
              <TextInput type="email" autoComplete="email" {...register("email")} />
            </FormField>
            <FormField label="Password" error={errors.password?.message}>
              <TextInput type="password" autoComplete="current-password" {...register("password")} />
            </FormField>
          </div>
          <SubmitButton isLoading={isSubmitting} loadingLabel="Signing in..." label="Sign in" />
        </form>
      </AuthCard>
    </>
  );
}
