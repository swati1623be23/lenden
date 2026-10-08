"use client";

import { useMemo, useState } from "react";
import { adToBs, bsToAdIso, bsMonthOptions } from "@/lib/dates/bsDate";
import type { FieldValues, Path, UseFormRegister, UseFormSetValue } from "react-hook-form";

interface BsDatePickerProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
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
  const initialBsDate = adToBs(value);
  const [bsYear, setBsYear] = useState(() => initialBsDate ? String(initialBsDate.year) : "");
  const [bsMonth, setBsMonth] = useState(() => initialBsDate?.month ?? 1);
  const [bsDay, setBsDay] = useState(() => initialBsDate?.date ?? 1);
  const [bsValidationError, setBsValidationError] = useState("");

  const maxBsDay = useMemo(() => {
    const year = Number(bsYear);
    if (!Number.isInteger(year) || year < 2000 || year > 2090) return 32;
    let maxDay = 0;
    for (let day = 1; day <= 32; day += 1) {
      if (bsToAdIso(year, bsMonth, day)) maxDay = day;
    }
    return maxDay || 32;
  }, [bsYear, bsMonth]);

  function syncBsFromAd(adValue: string) {
    const bs = adToBs(adValue);
    if (!bs) {
      setBsYear("");
      setBsDay(1);
      setBsValidationError(adValue ? "Enter a valid AD date." : "");
      return;
    }

    setBsYear(String(bs.year));
    setBsMonth(bs.month);
    setBsDay(bs.date);
    setBsValidationError("");
  }

  function syncAdFromBs(yearValue: string, month: number, day: number) {
    const iso = bsToAdIso(Number(yearValue), month, day);
    if (!iso) {
      setValue(name, "" as never, { shouldDirty: true, shouldValidate: true });
      setBsValidationError("Enter a valid BS date.");
      return;
    }

    setValue(name, iso as never, { shouldDirty: true, shouldValidate: true });
    setBsValidationError("");
  }

  const dateField = register(name);
  const currentBsDate = adToBs(value);

  return (
    <div className="space-y-2">
      <label className="block">
        <span className="text-sm font-medium text-slate-200">{label}</span>
        <input
          type="date"
          {...dateField}
          onChange={(event) => {
            dateField.onChange(event);
            syncBsFromAd(event.target.value);
          }}
          className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400"
        />
      </label>

      <div className="grid gap-3 sm:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-slate-200">BS Year</label>
          <input
            type="number"
            value={bsYear}
            onChange={(event) => {
              const nextYear = event.target.value;
              setBsYear(nextYear);
              syncAdFromBs(nextYear, bsMonth, bsDay);
            }}
            className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400"
            placeholder="2054"
            min={2000}
            max={2090}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-200">BS Month</label>
          <select
            value={bsMonth}
            onChange={(event) => {
              const nextMonth = Number(event.target.value);
              setBsMonth(nextMonth);
              syncAdFromBs(bsYear, nextMonth, bsDay);
            }}
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
            onChange={(event) => {
              const nextDay = Number(event.target.value);
              setBsDay(nextDay);
              syncAdFromBs(bsYear, bsMonth, nextDay);
            }}
            className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-400"
            min={1}
            max={maxBsDay}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-slate-700 bg-slate-950/80 p-3 text-sm text-slate-300">
        <p>AD: {value || "Not selected"}</p>
        <p>BS: {currentBsDate?.formatted || "Not selected"}</p>
      </div>
      {error || bsValidationError ? <p className="mt-1 text-sm text-rose-400">{error || bsValidationError}</p> : null}
    </div>
  );
}
