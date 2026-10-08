"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import NotificationBell from "@/components/notifications/NotificationBell";
import ThemeToggle from "@/components/layout/ThemeToggle";

interface SidebarProps {
  shopName?: string | null;
  profilePhotoUrl?: string | null;
}

export default function Sidebar({ shopName, profilePhotoUrl }: SidebarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/customers", label: "Customers" },
    { href: "/credits", label: "Credits" },
    { href: "/payments", label: "Payments" },
    { href: "/balances", label: "Balances" },
    { href: "/reports", label: "Reports" },
    { href: "/settings", label: "Settings" },
  ];

  async function handleLogout() {
    const response = await fetch("/api/auth/logout", { method: "POST" });
    if (response.ok) window.location.assign("/login");
  }

  return (
    <aside className="w-full shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/90 shadow-2xl shadow-slate-950/10 lg:w-72 lg:rounded-3xl">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 p-3 lg:p-6">
        <div className="flex items-center gap-3 lg:hidden">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 font-bold text-slate-950">L</div>
          <span className="text-sm font-semibold text-white">{shopName || "LenDen"}</span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <NotificationBell />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-200 hover:bg-white/10 hover:text-white lg:hidden"
            aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div className={`${mobileMenuOpen ? "block" : "hidden"} space-y-6 p-4 lg:block lg:p-6`}>
        <div>
          <div className="flex items-center gap-3">
            {profilePhotoUrl && (
              <div className="relative h-12 w-12 overflow-hidden rounded-full border border-emerald-400">
                <Image
                  src={profilePhotoUrl}
                  alt="Profile"
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
            )}
            <div className="flex-1">
              <p className="text-sm uppercase tracking-[0.24em] text-emerald-400/90">
                {shopName || "LenDen"}
              </p>
              <h2 className="mt-1 text-lg font-semibold text-white">
                {shopName || "Credit management"}
              </h2>
            </div>
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Secure customer, credit and payment tracking for your business.
          </p>
        </div>
        <nav className="space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block rounded-2xl px-4 py-3 text-sm font-medium transition ${
                pathname === link.href
                  ? "bg-emerald-500 text-slate-950"
                    : "text-slate-200 hover:bg-white/10 hover:text-white"
              }`}
                  onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          onClick={handleLogout}
          className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-slate-800 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-700"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
