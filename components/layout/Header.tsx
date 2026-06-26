"use client";

import NotificationBell from "@/components/notifications/NotificationBell";

export default function Header() {
  return (
    <div className="flex items-center justify-end p-4 bg-slate-900/50 border-b border-white/10 rounded-t-3xl">
      <div className="flex items-center gap-4">
        <NotificationBell />
      </div>
    </div>
  );
}
