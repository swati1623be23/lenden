"use client";

import { useEffect, useMemo, useState } from "react";
import { adToBs, bsToAdIso, bsMonthOptions } from "@/lib/dates/bsDate";
import type { UseFormRegister, FieldValues, UseFormSetValue } from "react-hook-form";

interface BsDatePickerProps<T extends FieldValues> {
  label: string;
  name: keyof T & string;
  value: string;
  register: UseFormRegister<T>;
  setValue: UseFormSetValue<T>;
  error?: string;
}

export default function BsDatePicker<T extends FieldValues>({
  label,
  name,
  value,
  register,
  setValue,
  error,
}: BsDatePickerProps<T>) {
  const [bsYear, setBsYear] = useState("");
  const [bsMonth, setBsMonth] = useState(1);
  const [bsDay, setBsDay] = useState(1);
  const [bsPreview, setBsPreview] = useState("");

  useEffect(() => {
    const bs = adToBs(value);
    if (bs) {
      setBsYear(String(bs.year));
      setBsMonth(bs.month);
      setBsDay(bs.date);
      setBsPreview(bs.formatted);
    }
  }, [value]);

  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const list = [];
    for (let year = 2000; year <= currentYear + 10; year += 1) {
      list.push(year);
    }
    return list;
  }, []);

  useEffect(() => {
    const parsedYear = Number(bsYear);
    const parsedMonth = Number(bsMonth);
    const parsedDay = Number(bsDay);

    if (!Number.isNaN(parsedYear) && parsedYear > 0 && parsedMonth >= 1 && parsedMonth <= 12 && parsedDay >= 1) {
      const iso = bsToAdIso(parsedYear, parsedMonth, parsedDay);
      if (iso) {
        setValue(name, iso);
        setBsPreview(`${parsedYear}-${String(parsedMonth).padStart(2, "0")}-${String(parsedDay).padStart(2, "0")}`);
      }
    }
  }, [bsYear, bsMonth, bsDay, name, setValue]);

  return (
    <div className="space-y-2">
      <label className="block">
        <span className="text-sm font-medium text-slate-200">{label}</span>
        <input
          type="date"
          {...register(name)}
          className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400"
        />
      </label>

      <div className="grid gap-3 sm:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-slate-200">BS Year</label>
          <input
            type="number"
            value={bsYear}
            onChange={(event) => setBsYear(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400"
            placeholder="2054"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-200">BS Month</label>
          <select
            value={bsMonth}
            onChange={(event) => setBsMonth(Number(event.target.value))}
            className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400"
          >
            {bsMonthOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-200">BS Day</label>
          <input
            type="number"
            value={bsDay}
            onChange={(event) => setBsDay(Number(event.target.value))}
            className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400"
            min={1}
            max={32}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-slate-700 bg-slate-950/80 p-3 text-sm text-slate-300">
        <p>Gregorian (AD): {value || "Not selected"}</p>
        <p>BS: {bsPreview ? `BS ${bsPreview}` : "Not selected"}</p>
      </div>
      {error ? <p className="mt-1 text-sm text-rose-400">{error}</p> : null}
    </div>
  );
}
