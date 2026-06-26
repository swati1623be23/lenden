"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "@/lib/useLocale";

interface LanguageSwitcherProps {
  defaultLocale?: "en" | "ne";
}

export default function LanguageSwitcher({ defaultLocale = "en" }: LanguageSwitcherProps) {
  const router = useRouter();
  const { locale, setLocale, t } = useLocale(defaultLocale);

  async function handleChange(nextLocale: "en" | "ne") {
    setLocale(nextLocale);
    router.refresh();
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs uppercase tracking-[0.24em] text-slate-400">{t("layout.language")}</span>
      <div className="inline-flex rounded-full border border-white/10 bg-slate-950/80 p-1">
        <button
          type="button"
          onClick={() => handleChange("en")}
          className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
            locale === "en"
              ? "bg-emerald-500 text-slate-950"
              : "text-slate-300 hover:bg-white/5 hover:text-white"
          }`}
        >
          EN
        </button>
        <button
          type="button"
          onClick={() => handleChange("ne")}
          className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
            locale === "ne"
              ? "bg-emerald-500 text-slate-950"
              : "text-slate-300 hover:bg-white/5 hover:text-white"
          }`}
        >
          ने
        </button>
      </div>
    </div>
  );
}
