import NepaliDate from "nepali-date-converter";

export type BsDate = {
  year: number;
  month: number;
  date: number;
  monthName: string;
  formatted: string;
};

const bsMonthNames = [
  "Baisakh",
  "Jestha",
  "Asar",
  "Shrawan",
  "Bhadra",
  "Aswin",
  "Kartik",
  "Mangsir",
  "Poush",
  "Magh",
  "Falgun",
  "Chaitra",
];

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function toIsoDate(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function parseIsoDate(value: string): Date | null {
  if (!value) return null;
  const parts = value.split("-");
  if (parts.length !== 3) return null;
  const [year, month, day] = parts.map(Number);
  if ([year, month, day].some((n) => Number.isNaN(n))) return null;
  const date = new Date(year, month - 1, day);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function adToBs(value: string | Date): BsDate | null {
  try {
    const date = typeof value === "string" ? parseIsoDate(value) : value;
    if (!date) return null;

    const nepaliDate = NepaliDate.fromAD(date);
    const bs = nepaliDate.getBS();
    const formatted = nepaliDate.format("YYYY-MM-DD");

    return {
      year: bs.year,
      month: bs.month,
      date: bs.date,
      monthName: bsMonthNames[bs.month - 1] ?? "",
      formatted,
    };
  } catch {
    return null;
  }
}

export function bsToAdIso(year: number, month: number, date: number): string | null {
  try {
    const nepaliDate = new NepaliDate(year, month - 1, date);
    return toIsoDate(nepaliDate.toJsDate());
  } catch {
    return null;
  }
}

export function formatAdDate(value: string | Date): string {
  const date = typeof value === "string" ? parseIsoDate(value) : value;
  if (!date) return "Invalid date";
  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

export function formatBsDate(value: string | Date): string {
  const bs = adToBs(value);
  return bs ? `BS ${bs.formatted}` : "Invalid BS date";
}

export function formatAdWithBs(value: string | Date): string {
  const ad = formatAdDate(value);
  const bs = formatBsDate(value);
  return `${ad} · ${bs}`;
}

export function getCurrentBsYear(): number {
  const now = new Date();
  const bs = NepaliDate.fromAD(now).getBS();
  return bs.year;
}

export const bsMonthOptions = bsMonthNames.map((label, index) => ({
  label,
  value: index + 1,
}));
