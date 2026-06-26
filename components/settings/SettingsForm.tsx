"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast, { Toaster } from "react-hot-toast";
import { settingsSchema } from "@/lib/validators";
import type { SettingsInput } from "@/lib/validators";
import { parseJSONResponse } from "@/lib/fetch";
import ProfilePhotoForm from "./ProfilePhotoForm";
import ShopSettingsForm from "./ShopSettingsForm";
import AboutTab from "./AboutTab";
import HelpTab from "./HelpTab";
import TermsOfServiceTab from "./TermsOfServiceTab";

export type SettingsUser = {
  id: string;
  name: string;
  email: string;
  profilePhotoUrl?: string | null;
  shopName?: string | null;
  shopPhone?: string | null;
  shopAddress?: string | null;
  shopLogoUrl?: string | null;
};

interface SettingsFormProps {
  user: SettingsUser;
}

export default function SettingsForm({ user }: SettingsFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<"profile" | "photo" | "shop" | "about" | "help" | "terms">("profile");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SettingsInput>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: SettingsInput) {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "profile",
          ...values,
        }),
      });

      const result = await parseJSONResponse(response);

      if (!response.ok) {
        if (typeof result?.error === "string") {
          toast.error(result.error);
          return;
        }

        toast.error("Unable to save changes.");
        return;
      }

      toast.success("Settings saved successfully.");
      reset({
        name: result.user.name,
        email: result.user.email,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      router.refresh();
    } catch (error) {
      console.error("Update settings error:", error);
      toast.error("Unable to save changes.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <Toaster position="top-right" />

      {/* Tabs */}
      <div className="mt-8 flex flex-wrap border-b border-white/10">
        <button
          onClick={() => setActiveTab("profile")}
          className={`px-6 py-3 text-sm font-semibold transition ${
            activeTab === "profile"
              ? "border-b-2 border-emerald-400 text-emerald-400"
              : "text-slate-400 hover:text-slate-300"
          }`}
        >
          Profile & Account
        </button>
        <button
          onClick={() => setActiveTab("photo")}
          className={`px-6 py-3 text-sm font-semibold transition ${
            activeTab === "photo"
              ? "border-b-2 border-emerald-400 text-emerald-400"
              : "text-slate-400 hover:text-slate-300"
          }`}
        >
          Profile Photo
        </button>
        <button
          onClick={() => setActiveTab("shop")}
          className={`px-6 py-3 text-sm font-semibold transition ${
            activeTab === "shop"
              ? "border-b-2 border-emerald-400 text-emerald-400"
              : "text-slate-400 hover:text-slate-300"
          }`}
        >
          Shop Settings
        </button>
        <button
          onClick={() => setActiveTab("about")}
          className={`px-6 py-3 text-sm font-semibold transition ${
            activeTab === "about"
              ? "border-b-2 border-emerald-400 text-emerald-400"
              : "text-slate-400 hover:text-slate-300"
          }`}
        >
          About
        </button>
        <button
          onClick={() => setActiveTab("help")}
          className={`px-6 py-3 text-sm font-semibold transition ${
            activeTab === "help"
              ? "border-b-2 border-emerald-400 text-emerald-400"
              : "text-slate-400 hover:text-slate-300"
          }`}
        >
          Help
        </button>
        <button
          onClick={() => setActiveTab("terms")}
          className={`px-6 py-3 text-sm font-semibold transition ${
            activeTab === "terms"
              ? "border-b-2 border-emerald-400 text-emerald-400"
              : "text-slate-400 hover:text-slate-300"
          }`}
        >
          Terms of Service
        </button>
      </div>

      {/* Profile & Account Tab */}
      {activeTab === "profile" && (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-8">
          <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Profile</p>
            <p className="mt-4 text-2xl font-semibold text-white">{user.name}</p>
            <p className="mt-2 text-sm text-slate-400">{user.email}</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Account</p>
            <p className="mt-4 text-sm leading-6 text-slate-400">
              Update your profile details or change your password. Leave password fields blank to keep your current
              password.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
            <p className="text-sm uppercase tracking-[0.24em] text-emerald-400/90">Profile details</p>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium text-slate-200">Name</span>
                <input
                  type="text"
                  autoComplete="name"
                  {...register("name")}
                  className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400"
                />
                <p className="mt-1 text-sm text-rose-400">{errors.name?.message}</p>
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-200">Email</span>
                <input
                  type="email"
                  autoComplete="email"
                  {...register("email")}
                  className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400"
                />
                <p className="mt-1 text-sm text-rose-400">{errors.email?.message}</p>
              </label>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
            <p className="text-sm uppercase tracking-[0.24em] text-emerald-400/90">Change password</p>

            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              <label className="block">
                <span className="text-sm font-medium text-slate-200">Current password</span>
                <input
                  type="password"
                  autoComplete="current-password"
                  {...register("currentPassword")}
                  className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400"
                />
                <p className="mt-1 text-sm text-rose-400">{errors.currentPassword?.message}</p>
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-200">New password</span>
                <input
                  type="password"
                  autoComplete="new-password"
                  {...register("newPassword")}
                  className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400"
                />
                <p className="mt-1 text-sm text-rose-400">{errors.newPassword?.message}</p>
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-200">Confirm new password</span>
                <input
                  type="password"
                  autoComplete="new-password"
                  {...register("confirmPassword")}
                  className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400"
                />
                <p className="mt-1 text-sm text-rose-400">{errors.confirmPassword?.message}</p>
              </label>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>
      )}

      {/* Profile Photo Tab */}
      {activeTab === "photo" && <ProfilePhotoForm user={user} />}

      {/* Shop Settings Tab */}
      {activeTab === "shop" && <ShopSettingsForm user={user} />}

      {/* About Tab */}
      {activeTab === "about" && <AboutTab />}

      {/* Help Tab */}
      {activeTab === "help" && <HelpTab />}

      {/* Terms of Service Tab */}
      {activeTab === "terms" && <TermsOfServiceTab />}
    </div>
  );
}
