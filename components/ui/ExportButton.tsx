"use client";

import { useEffect, useRef, useState } from "react";
import type { ExportFormat } from "@/lib/export/exportData";

type ExportButtonProps = {
  onExport: (format: ExportFormat) => void;
  disabled?: boolean;
};

export default function ExportButton({ onExport, disabled = false }: ExportButtonProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleExport(format: ExportFormat) {
    onExport(format);
    setOpen(false);
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((current) => !current)}
        className="inline-flex items-center justify-center rounded-2xl border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-emerald-400 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        Export
      </button>

      {open ? (
        <div className="absolute right-0 z-20 mt-2 min-w-[140px] overflow-hidden rounded-2xl border border-white/10 bg-slate-950 shadow-xl">
          <button
            type="button"
            onClick={() => handleExport("csv")}
            className="block w-full px-4 py-3 text-left text-sm font-medium text-slate-200 transition hover:bg-emerald-500/10 hover:text-emerald-300"
          >
            Export CSV
          </button>
          <button
            type="button"
            onClick={() => handleExport("xlsx")}
            className="block w-full border-t border-white/5 px-4 py-3 text-left text-sm font-medium text-slate-200 transition hover:bg-emerald-500/10 hover:text-emerald-300"
          >
            Export XLSX
          </button>
        </div>
      ) : null}
    </div>
  );
}
