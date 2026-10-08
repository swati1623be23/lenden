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

function parseAdValue(value: string | Date): Date | null {
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : new Date(value.getFullYear(), value.getMonth(), value.getDate());
  }

  if (!value) return null;

  const datePart = value.trim().slice(0, 10);
  const parts = datePart.split("-");
  if (parts.length !== 3) return null;

  const [year, month, day] = parts.map(Number);
  if (![year, month, day].every(Number.isInteger) || month < 1 || month > 12 || day < 1 || day > 31) return null;

  const date = new Date(year, month - 1, day);
  if (
    Number.isNaN(date.getTime()) ||
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }
  return date;
}

export function adToBs(value: string | Date): BsDate | null {
  try {
    const date = parseAdValue(value);
    if (!date) return null;

    const nepaliDate = NepaliDate.fromAD(date);
    const bs = nepaliDate.getBS();
    const formatted = `${nepaliDate.format("YYYY-MM-DD")} BS`;

    return {
      year: bs.year,
      month: bs.month + 1,
      date: bs.date,
      monthName: bsMonthNames[bs.month] ?? "",
      formatted,
    };
  } catch {
    return null;
  }
}

export function bsToAdIso(year: number, month: number, date: number): string | null {
  try {
    if (
      !Number.isInteger(year) || year < 2000 || year > 2090 ||
      !Number.isInteger(month) || month < 1 || month > 12 ||
      !Number.isInteger(date) || date < 1 || date > 32
    ) {
      return null;
    }

    const nepaliDate = new NepaliDate(year, month - 1, date);
    const bs = nepaliDate.getBS();
    if (bs.year !== year || bs.month !== month - 1 || bs.date !== date) return null;

    const ad = nepaliDate.getAD();
    const iso = `${ad.year}-${pad(ad.month + 1)}-${pad(ad.date)}`;
    const roundTrip = adToBs(iso);
    if (!roundTrip || roundTrip.year !== year || roundTrip.month !== month || roundTrip.date !== date) return null;
    return iso;
  } catch {
    return null;
  }
}

export function isValidAdDate(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && Boolean(adToBs(value));
}

export function getTodayAdIso(): string {
  return toIsoDate(new Date());
}

export function formatAdDate(value: string | Date): string {
  const date = parseAdValue(value);
  if (!date) return "Invalid date";
  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

export function formatBsDate(value: string | Date): string {
  const bs = adToBs(value);
  return bs ? bs.formatted : "Invalid BS date";
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
