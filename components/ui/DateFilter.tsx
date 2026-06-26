"use client";

import { useEffect, useState } from "react";
import type { DateFilterPreset, DateRange } from "@/lib/dates/dateFilter";
import { getDateRangeForPreset } from "@/lib/dates/dateFilter";
import { formatBsDate } from "@/lib/dates/bsDate";
import { TextInput } from "@/components/ui/FormField";

export type DateFilterValue = {
  preset: DateFilterPreset | null;
  range: DateRange | null;
  customStart: string;
  customEnd: string;
};

type DateFilterProps = {
  value: DateFilterValue;
  onChange: (value: DateFilterValue) => void;
};

const presetLabels: { id: DateFilterPreset; label: string }[] = [
  { id: "today", label: "Today" },
  { id: "week", label: "This Week" },
  { id: "month", label: "This Month" },
  { id: "custom", label: "Custom Range" },
];

function buildValue(
  preset: DateFilterPreset | null,
  customStart = "",
  customEnd = "",
): DateFilterValue {
  if (!preset) {
    return { preset: null, range: null, customStart, customEnd };
  }

  if (preset === "custom") {
    return {
      preset,
      range: getDateRangeForPreset("custom", customStart, customEnd),
      customStart,
      customEnd,
    };
  }

  return {
    preset,
    range: getDateRangeForPreset(preset),
    customStart,
    customEnd,
  };
}

export default function DateFilter({ value, onChange }: DateFilterProps) {
  const [customStart, setCustomStart] = useState(value.customStart);
  const [customEnd, setCustomEnd] = useState(value.customEnd);

  useEffect(() => {
    setCustomStart(value.customStart);
    setCustomEnd(value.customEnd);
  }, [value.customStart, value.customEnd]);

  function handlePresetClick(preset: DateFilterPreset) {
    if (value.preset === preset && preset !== "custom") {
      onChange(buildValue(null));
      return;
    }

    onChange(buildValue(preset, customStart, customEnd));
  }

  function handleCustomChange(start: string, end: string) {
    setCustomStart(start);
    setCustomEnd(end);
    onChange(buildValue("custom", start, end));
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {presetLabels.map((preset) => {
          const isActive = value.preset === preset.id;

          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => handlePresetClick(preset.id)}
              className={`rounded-2xl border px-4 py-2 text-sm font-semibold transition ${
                isActive
                  ? "border-emerald-400 bg-emerald-500/10 text-emerald-300"
                  : "border-slate-700 text-slate-300 hover:border-emerald-400/60 hover:text-white"
              }`}
            >
              {preset.label}
            </button>
          );
        })}
        {value.preset ? (
          <button
            type="button"
            onClick={() => onChange(buildValue(null))}
            className="rounded-2xl border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-400 transition hover:border-slate-500 hover:text-white"
          >
            Clear
          </button>
        ) : null}
      </div>

      {value.range ? (
        <div className="rounded-3xl border border-slate-700 bg-slate-950/80 p-4 text-sm text-slate-300">
          <div className="grid gap-2 sm:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Start</p>
              <p>{value.range.start.toLocaleDateString()}</p>
              <p className="mt-1 text-xs text-slate-400">{formatBsDate(value.range.start)}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">End</p>
              <p>{value.range.end.toLocaleDateString()}</p>
              <p className="mt-1 text-xs text-slate-400">{formatBsDate(value.range.end)}</p>
            </div>
          </div>
        </div>
      ) : null}

      {value.preset === "custom" ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-slate-200">From</span>
            <div className="mt-2">
              <TextInput
                type="date"
                value={customStart}
                onChange={(event) => handleCustomChange(event.target.value, customEnd)}
              />
              {customStart ? (
                <p className="mt-2 text-xs text-slate-400">BS: {formatBsDate(customStart)}</p>
              ) : null}
            </div>
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-200">To</span>
            <div className="mt-2">
              <TextInput
                type="date"
                value={customEnd}
                onChange={(event) => handleCustomChange(customStart, event.target.value)}
              />
              {customEnd ? (
                <p className="mt-2 text-xs text-slate-400">BS: {formatBsDate(customEnd)}</p>
              ) : null}
            </div>
          </label>
        </div>
      ) : null}
    </div>
  );
}

export function createEmptyDateFilterValue(): DateFilterValue {
  return buildValue(null);
}
