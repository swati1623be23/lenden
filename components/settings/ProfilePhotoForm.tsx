"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";
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
      // In production, send to backend API that handles S3/Cloudinary upload
      resolve(dataUrl);
    };
    reader.readAsDataURL(file);
  });
};

export type ProfilePhotoUser = {
  id: string;
  name: string;
  email: string;
  profilePhotoUrl?: string | null;
};

interface ProfilePhotoFormProps {
  user: ProfilePhotoUser;
}

export default function ProfilePhotoForm({ user }: ProfilePhotoFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<{ profilePhotoUrl?: string }>({
    defaultValues: {
      profilePhotoUrl: user.profilePhotoUrl || undefined,
    },
  });

  const profilePhotoUrl = watch("profilePhotoUrl");

  async function onSubmit(values: { profilePhotoUrl?: string }) {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "profilePhoto",
          profilePhotoUrl: values.profilePhotoUrl,
        }),
      });

      const result = await parseJSONResponse(response);

      if (!response.ok) {
        if (typeof result?.error === "string") {
          toast.error(result.error);
          return;
        }

        toast.error("Unable to save profile photo.");
        return;
      }

      toast.success("Profile photo updated successfully.");
      router.refresh();
    } catch (error) {
      console.error("Update profile photo error:", error);
      toast.error("Unable to save profile photo.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <Toaster position="top-right" />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
          <p className="text-sm uppercase tracking-[0.24em] text-emerald-400/90">Profile Photo</p>

          <div className="mt-6">
            <ImageUpload
              label="Profile Photo (JPG, PNG - Max 2MB)"
              value={profilePhotoUrl}
              onChange={(url) => setValue("profilePhotoUrl", url)}
              onUpload={uploadImageToServer}
              maxSizeMB={2}
              acceptedFormats={["image/jpeg", "image/png"]}
            />
            {errors.profilePhotoUrl && (
              <p className="mt-2 text-sm text-rose-400">{errors.profilePhotoUrl.message}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : "Save photo"}
          </button>
        </div>
      </form>
    </div>
  );
}
