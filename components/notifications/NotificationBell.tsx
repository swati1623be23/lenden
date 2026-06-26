"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  relatedCustomerId?: string;
}

export default function NotificationBell() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch notifications
  async function fetchNotifications() {
    try {
      const response = await fetch("/api/notifications?limit=10");
      const data = await response.json();

      if (response.ok) {
        setNotifications(data.notifications || []);
        setUnreadCount(data.unreadCount || 0);
      }
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  }

  // Fetch on mount and set up polling
  useEffect(() => {
    fetchNotifications();

    // Poll for new notifications every 10 seconds
    const interval = setInterval(fetchNotifications, 10000);
    return () => clearInterval(interval);
  }, []);

  // Mark notification as read
  async function markAsRead(notificationId: string) {
    try {
      const response = await fetch(`/api/notifications/${notificationId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isRead: true }),
      });

      if (response.ok) {
        setNotifications((prev) =>
          prev.map((n) => (n.id === notificationId ? { ...n, isRead: true } : n))
        );
        setUnreadCount((count) => Math.max(0, count - 1));
      }
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  }

  // Mark all as read
  async function markAllAsRead() {
    setIsLoading(true);
    try {
      const response = await fetch("/api/notifications/mark-all-read", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
        setUnreadCount(0);
        toast.success("All notifications marked as read.");
      }
    } catch (error) {
      console.error("Failed to mark all as read:", error);
      toast.error("Failed to mark all as read.");
    } finally {
      setIsLoading(false);
    }
  }

  // Delete notification
  async function deleteNotification(notificationId: string) {
    try {
      const response = await fetch(`/api/notifications/${notificationId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
      }
    } catch (error) {
      console.error("Failed to delete notification:", error);
    }
  }

  // Get icon based on notification type
  function getNotificationIcon(type: string) {
    switch (type) {
      case "customer_added":
        return "👤";
      case "credit_added":
        return "📝";
      case "payment_added":
        return "💰";
      case "overdue_reminder":
        return "⏰";
      case "import_event":
      case "export_event":
        return "📊";
      default:
        return "📢";
    }
  }

  // Format time ago
  function formatTimeAgo(date: string) {
    const now = new Date();
    const notificationDate = new Date(date);
    const seconds = Math.floor((now.getTime() - notificationDate.getTime()) / 1000);

    if (seconds < 60) return "just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  }

  return (
    <div className="relative">
      {/* Notification Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative inline-flex items-center justify-center p-2 rounded-full hover:bg-white/10 transition"
        aria-label="Notifications"
      >
        <span className="text-xl">🔔</span>

        {/* Unread Badge */}
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-rose-500 rounded-full">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-white/10 bg-slate-900/95 shadow-2xl shadow-slate-950/50 z-50 overflow-hidden">
          {/* Header */}
          <div className="border-b border-white/10 bg-slate-950/80 p-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                disabled={isLoading}
                className="text-xs text-emerald-400 hover:text-emerald-300 transition disabled:opacity-50"
              >
                {isLoading ? "Marking..." : "Mark all read"}
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-sm text-slate-400">No notifications yet</p>
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-white/5 transition cursor-pointer ${
                      !notification.isRead ? "bg-emerald-500/10" : ""
                    }`}
                  >
                    <div className="flex gap-3">
                      {/* Icon */}
                      <span className="text-2xl flex-shrink-0">
                        {getNotificationIcon(notification.type)}
                      </span>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-sm font-medium text-white">{notification.title}</p>
                            <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                              {notification.message}
                            </p>
                          </div>

                          {/* Delete Button */}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="text-xs text-slate-500 hover:text-rose-400 transition flex-shrink-0"
                            title="Delete notification"
                          >
                            ✕
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <p className="text-xs text-slate-500">
                            {formatTimeAgo(notification.createdAt)}
                          </p>

                          {!notification.isRead && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="text-xs text-emerald-400 hover:text-emerald-300 transition"
                            >
                              Mark read
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Unread Indicator */}
                      {!notification.isRead && (
                        <div className="flex-shrink-0 w-2 h-2 rounded-full bg-emerald-400 mt-1" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="border-t border-white/10 p-3 text-center">
              <a
                href="#"
                className="text-xs text-emerald-400 hover:text-emerald-300 transition"
              >
                View all notifications
              </a>
            </div>
          )}
        </div>
      )}

      {/* Close on outside click */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
