import { cookies } from "next/headers";

import { LOCALE_COOKIE_NAME, getLocaleFromString, type Locale } from "@/lib/i18n";

export async function getLocaleFromCookies(cookieStore: ReturnType<typeof cookies>): Promise<Locale> {
  const cookieStoreValue = await cookieStore;
  const localeCookie = cookieStoreValue.get(LOCALE_COOKIE_NAME)?.value;
  return getLocaleFromString(localeCookie);
}
