"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast, { Toaster } from "react-hot-toast";
import { shopSettingsSchema } from "@/lib/validators";
import type { ShopSettingsInput } from "@/lib/validators";
import ImageUpload from "./ImageUpload";
import { parseJSONResponse } from "@/lib/fetch";

// Simple image URL validation - in real app, this would use a backend upload service
const uploadImageToServer = async (file: File): Promise<string> => {
  // For demo purposes, we'll use a data URL
  // In production, you'd upload to a service like AWS S3, Cloudinary, etc.
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      resolve(dataUrl);
    };
    reader.readAsDataURL(file);
  });
};

export type ShopSettingsUser = {
  id: string;
  shopName?: string | null;
  shopPhone?: string | null;
  shopAddress?: string | null;
  shopLogoUrl?: string | null;
};

interface ShopSettingsFormProps {
  user: ShopSettingsUser;
}

export default function ShopSettingsForm({ user }: ShopSettingsFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ShopSettingsInput & { shopLogoUrl?: string }>({
    resolver: zodResolver(shopSettingsSchema),
    defaultValues: {
      shopName: user.shopName || "",
      shopPhone: user.shopPhone || "",
      shopAddress: user.shopAddress || "",
      shopLogoUrl: user.shopLogoUrl || undefined,
    },
  });

  const shopLogoUrl = watch("shopLogoUrl");

  async function onSubmit(values: ShopSettingsInput & { shopLogoUrl?: string }) {
    setIsSubmitting(true);

    try {
      // Save shop settings
      const settingsResponse = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "shop",
          shopName: values.shopName,
          shopPhone: values.shopPhone,
          shopAddress: values.shopAddress,
        }),
      });

      const settingsResult = await parseJSONResponse(settingsResponse);

      if (!settingsResponse.ok) {
        if (typeof settingsResult?.error === "string") {
          toast.error(settingsResult.error);
          return;
        }

        toast.error("Unable to save shop settings.");
        return;
      }

      // Save shop logo if provided
      if (values.shopLogoUrl) {
        const logoResponse = await fetch("/api/settings", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "shopLogo",
            shopLogoUrl: values.shopLogoUrl,
          }),
        });

        const logoResult = await parseJSONResponse(logoResponse);

        if (!logoResponse.ok) {
          console.error("Failed to save logo:", logoResult);
        }
      }

      toast.success("Shop settings saved successfully.");
      reset({
        shopName: values.shopName,
        shopPhone: values.shopPhone,
        shopAddress: values.shopAddress,
        shopLogoUrl: values.shopLogoUrl,
      });
      router.refresh();
    } catch (error) {
      console.error("Update shop settings error:", error);
      toast.error("Unable to save shop settings.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <Toaster position="top-right" />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
          <p className="text-sm uppercase tracking-[0.24em] text-emerald-400/90">Shop Information</p>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-slate-200">Shop Name</span>
              <input
                type="text"
                placeholder="Your shop name"
                {...register("shopName")}
                className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400"
              />
              <p className="mt-1 text-sm text-rose-400">{errors.shopName?.message}</p>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-200">Shop Phone</span>
              <input
                type="tel"
                placeholder="Contact number"
                {...register("shopPhone")}
                className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400"
              />
              <p className="mt-1 text-sm text-rose-400">{errors.shopPhone?.message}</p>
            </label>
          </div>

          <div className="mt-6">
            <label className="block">
              <span className="text-sm font-medium text-slate-200">Shop Address</span>
              <textarea
                placeholder="Full address"
                {...register("shopAddress")}
                className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400"
                rows={3}
              />
              <p className="mt-1 text-sm text-rose-400">{errors.shopAddress?.message}</p>
            </label>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
          <p className="text-sm uppercase tracking-[0.24em] text-emerald-400/90">Shop Logo</p>

          <div className="mt-6">
            <ImageUpload
              label="Shop Logo (JPG, PNG - Max 2MB)"
              value={shopLogoUrl}
              onChange={(url) => setValue("shopLogoUrl", url)}
              onUpload={uploadImageToServer}
              maxSizeMB={2}
              acceptedFormats={["image/jpeg", "image/png"]}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : "Save settings"}
          </button>
        </div>
      </form>
    </div>
  );
}
