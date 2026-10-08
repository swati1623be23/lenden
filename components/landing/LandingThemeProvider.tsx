"use client";

import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react";

type LandingTheme = "light" | "dark";
const themeStorageKey = "lenden-app-theme";
const legacyThemeStorageKey = "lenden-landing-theme";
const themeChangeEvent = "lenden-landing-theme-change";

function subscribeToTheme(listener: () => void) {
  window.addEventListener(themeChangeEvent, listener);
  window.addEventListener("storage", listener);
  return () => {
    window.removeEventListener(themeChangeEvent, listener);
    window.removeEventListener("storage", listener);
  };
}

function getThemeSnapshot(): LandingTheme {
  const savedTheme = window.localStorage.getItem(themeStorageKey) ?? window.localStorage.getItem(legacyThemeStorageKey);
  return savedTheme === "light" ? "light" : "dark";
}

function getServerThemeSnapshot(): LandingTheme {
  return "dark";
}

const LandingThemeContext = createContext<{
  theme: LandingTheme;
  setTheme: (theme: LandingTheme) => void;
} | null>(null);

export function LandingThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, getServerThemeSnapshot);
  const setTheme = (nextTheme: LandingTheme) => {
    window.localStorage.setItem(themeStorageKey, nextTheme);
    window.dispatchEvent(new Event(themeChangeEvent));
  };

  return (
    <LandingThemeContext.Provider value={{ theme, setTheme }}>
      <div className="app-theme" data-theme={theme}>
        {children}
      </div>
    </LandingThemeContext.Provider>
  );
}

export function useLandingTheme() {
  const context = useContext(LandingThemeContext);
  if (!context) {
    throw new Error("useLandingTheme must be used within LandingThemeProvider");
  }
  return context;
}