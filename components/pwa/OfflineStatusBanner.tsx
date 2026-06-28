"use client";

import { useEffect, useState } from "react";

export function OfflineStatusBanner() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const updateStatus = () => {
      setIsOffline(typeof navigator !== "undefined" && !navigator.onLine);
    };

    updateStatus();

    window.addEventListener("online", () => {
      updateStatus();
      window.location.reload();
    });
    window.addEventListener("offline", updateStatus);

    return () => {
      window.removeEventListener("online", () => {
        updateStatus();
        window.location.reload();
      });
      window.removeEventListener("offline", updateStatus);
    };
  }, []);

  if (!isOffline) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-full border border-amber-400/50 bg-amber-500/90 px-4 py-2 text-sm font-medium text-white shadow-lg">
      Offline Mode
    </div>
  );
}
