export const LOCALE_COOKIE_NAME = "ld_locale" as const;
export const DEFAULT_LOCALE = "en" as const;
export const SUPPORTED_LOCALES = ["en", "ne"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

import en from "@/locales/en.json";
import ne from "@/locales/ne.json";

const translations = { en, ne } as const;

type TranslationObject = (typeof translations)[Locale];

export function getLocaleFromString(value?: string): Locale {
  if (!value) return DEFAULT_LOCALE;
  const normalized = value.toLowerCase();
  if (SUPPORTED_LOCALES.includes(normalized as Locale)) return normalized as Locale;
  return DEFAULT_LOCALE;
}

export function translate(locale: Locale, key: string): string {
  const segments = key.split(".");
  let current: unknown = translations[locale];

  for (const segment of segments) {
    if (current && typeof current === "object" && segment in (current as Record<string, unknown>)) {
      current = (current as Record<string, unknown>)[segment];
    } else {
      return translate(DEFAULT_LOCALE, key);
    }
  }

  return typeof current === "string" ? current : key;
}

export function getTranslationObject(locale: Locale): TranslationObject {
  return translations[locale];
}

export function getLocaleCookieValue(cookieHeader: string): Locale {
  const match = new RegExp(`(^|;)\\s*${LOCALE_COOKIE_NAME}=([^;]+)`).exec(cookieHeader);
  return getLocaleFromString(match?.[2]);
}
