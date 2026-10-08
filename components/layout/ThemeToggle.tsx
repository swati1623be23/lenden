"use client";

import { Moon, Sun } from "lucide-react";
import { useLandingTheme } from "@/components/landing/LandingThemeProvider";

export default function ThemeToggle() {
  const { theme, setTheme } = useLandingTheme();

  return (
    <div className="theme-toggle inline-flex items-center rounded-lg border border-[#dce5dd] bg-white p-1" role="group" aria-label="Color theme">
      <button
        type="button"
        aria-label="Light mode"
        aria-pressed={theme === "light"}
        title="Light mode"
        onClick={() => setTheme("light")}
        className={`flex h-8 items-center gap-1.5 rounded-md px-2.5 text-xs font-medium transition ${
          theme === "light" ? "bg-emerald-800 text-white" : "text-slate-600 hover:text-emerald-800"
        }`}
      >
        <Sun size={15} />
        <span>Light</span>
      </button>
      <button
        type="button"
        aria-label="Dark mode"
        aria-pressed={theme === "dark"}
        title="Dark mode"
        onClick={() => setTheme("dark")}
        className={`flex h-8 items-center gap-1.5 rounded-md px-2.5 text-xs font-medium transition ${
          theme === "dark" ? "bg-emerald-800 text-white" : "text-slate-600 hover:text-emerald-800"
        }`}
      >
        <Moon size={15} />
        <span>Dark</span>
      </button>
    </div>
  );
}