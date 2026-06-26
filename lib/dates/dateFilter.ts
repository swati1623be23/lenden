export type DateFilterPreset = "today" | "week" | "month" | "custom";

export type DateRange = {
  start: Date;
  end: Date;
};

export function getDateRangeForPreset(
  preset: DateFilterPreset,
  customStart?: string,
  customEnd?: string,
): DateRange | null {
  const now = new Date();

  if (preset === "today") {
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
    return { start, end };
  }

  if (preset === "week") {
    const day = now.getDay();
    const diffToMonday = day === 0 ? 6 : day - 1;
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - diffToMonday);
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(end.getDate() + 6);
    end.setHours(23, 59, 59, 999);
    return { start, end };
  }

  if (preset === "month") {
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
    return { start, end };
  }

  if (preset === "custom" && customStart && customEnd) {
    const start = new Date(`${customStart}T00:00:00`);
    const end = new Date(`${customEnd}T23:59:59.999`);

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || start > end) {
      return null;
    }

    return { start, end };
  }

  return null;
}

export function isDateInRange(date: Date | string, range: DateRange): boolean {
  const value = typeof date === "string" ? new Date(date) : date;
  return value >= range.start && value <= range.end;
}

export function parseReportsDateFilter(searchParams: {
  filter?: string;
  from?: string;
  to?: string;
}): { preset: DateFilterPreset | null; range: DateRange | null; from?: string; to?: string } {
  const preset = searchParams.filter as DateFilterPreset | undefined;

  if (!preset || !["today", "week", "month", "custom"].includes(preset)) {
    return { preset: null, range: null };
  }

  if (preset === "custom") {
    const range = getDateRangeForPreset("custom", searchParams.from, searchParams.to);
    return {
      preset,
      range,
      from: searchParams.from,
      to: searchParams.to,
    };
  }

  return {
    preset,
    range: getDateRangeForPreset(preset),
  };
}
