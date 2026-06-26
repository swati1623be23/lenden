import { cookies } from "next/headers";

import { LOCALE_COOKIE_NAME, getLocaleFromString, type Locale } from "@/lib/i18n";

export function getLocaleFromCookies(cookieStore: ReturnType<typeof cookies>): Locale {
  const localeCookie = cookieStore.get(LOCALE_COOKIE_NAME)?.value;
  return getLocaleFromString(localeCookie);
}
