"use client";

import { useEffect, useState } from "react";
import { DEFAULT_LOCALE, LOCALE_COOKIE_NAME, Locale, getLocaleFromString, translate } from "@/lib/i18n";

function readLocaleFromBrowser(defaultLocale: Locale = DEFAULT_LOCALE): Locale {
  if (typeof window === "undefined") {
    return defaultLocale;
  }

  const cookieMatch = document.cookie.match(new RegExp(`(^|;)\\s*${LOCALE_COOKIE_NAME}=([^;]+)`));
  if (cookieMatch?.[2]) {
    return getLocaleFromString(cookieMatch[2]);
  }

  try {
    const saved = window.localStorage.getItem(LOCALE_COOKIE_NAME);
    if (saved) {
      return getLocaleFromString(saved);
    }
  } catch {
    // ignore localStorage failures
  }

  return defaultLocale;
}

function writeLocaleToBrowser(locale: Locale) {
  if (typeof document === "undefined") return;

  const maxAge = 60 * 60 * 24 * 365;
  document.cookie = `${LOCALE_COOKIE_NAME}=${locale}; path=/; max-age=${maxAge}; samesite=lax`;

  try {
    window.localStorage.setItem(LOCALE_COOKIE_NAME, locale);
  } catch {
    // ignore localStorage failures
  }
}

export function useLocale(defaultLocale: Locale = DEFAULT_LOCALE) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const browserLocale = readLocaleFromBrowser(defaultLocale);
    if (browserLocale !== locale) {
      setLocaleState(browserLocale);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function setLocale(nextLocale: Locale) {
    writeLocaleToBrowser(nextLocale);
    setLocaleState(nextLocale);
  }

  function t(key: string) {
    return translate(locale, key);
  }

  return {
    locale,
    setLocale,
    t,
  } as const;
}
