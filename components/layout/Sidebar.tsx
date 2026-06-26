"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import NotificationBell from "@/components/notifications/NotificationBell";

interface SidebarProps {
  shopName?: string | null;
  profilePhotoUrl?: string | null;
}

export default function Sidebar({ shopName, profilePhotoUrl }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

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
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <aside className="hidden w-72 shrink-0 rounded-3xl border border-white/10 bg-slate-900/90 shadow-2xl shadow-slate-950/10 lg:block">
      {/* Header with Notification Bell and language picker */}
      <div className="flex items-center justify-between p-6 border-b border-white/10">
        <div className="flex items-center gap-4">
          <NotificationBell />
        </div>
      </div>

      <div className="p-6 space-y-6">
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
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
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
