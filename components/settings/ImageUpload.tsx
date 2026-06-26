"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

interface ImageUploadProps {
  label: string;
  value?: string;
  onChange: (url: string) => void;
  onUpload: (file: File) => Promise<string>;
  maxSizeMB?: number;
  acceptedFormats?: string[];
}

export default function ImageUpload({
  label,
  value,
  onChange,
  onUpload,
  maxSizeMB = 2,
  acceptedFormats = ["image/jpeg", "image/png"],
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(value || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!acceptedFormats.includes(file.type)) {
      toast.error(`Only ${acceptedFormats.map((f) => f.split("/")[1].toUpperCase()).join(", ")} files are allowed.`);
      return;
    }

    // Validate file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSizeMB) {
      toast.error(`File size must be less than ${maxSizeMB}MB.`);
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreview(result);
    };
    reader.readAsDataURL(file);

    // Upload file
    setIsUploading(true);
    try {
      const url = await onUpload(file);
      onChange(url);
      toast.success(`${label} uploaded successfully.`);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(`Failed to upload ${label}.`);
      setPreview(value || null);
    } finally {
      setIsUploading(false);
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div>
      <label className="block">
        <span className="text-sm font-medium text-slate-200">{label}</span>

        <div className="mt-3 flex items-center gap-4">
          {preview && (
            <div className="relative h-24 w-24 overflow-hidden rounded-lg border border-slate-700">
              <Image
                src={preview}
                alt="Preview"
                fill
                className="object-cover"
                sizes="96px"
              />
            </div>
          )}

          <div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isUploading ? "Uploading..." : preview ? "Change" : "Upload"}
            </button>

            <p className="mt-2 text-xs text-slate-400">
              Supported formats: {acceptedFormats.map((f) => f.split("/")[1].toUpperCase()).join(", ")}
              <br />
              Max size: {maxSizeMB}MB
            </p>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedFormats.join(",")}
          onChange={handleFileSelect}
          className="hidden"
          disabled={isUploading}
        />
      </label>
    </div>
  );
}
