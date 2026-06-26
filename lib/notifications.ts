/**
 * Notification service for creating and managing notifications
 * These functions should be called from server-side code (API routes)
 */

import { prisma } from "@/lib/prisma";

export type NotificationType =
  | "customer_added"
  | "credit_added"
  | "payment_added"
  | "overdue_reminder"
  | "import_event"
  | "export_event";

export interface CreateNotificationParams {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  relatedCustomerId?: string;
}

/**
 * Create a notification for a user
 */
export async function createNotification(params: CreateNotificationParams) {
  try {
    return await prisma.notification.create({
      data: {
        userId: params.userId,
        type: params.type,
        title: params.title,
        message: params.message,
        relatedCustomerId: params.relatedCustomerId || null,
      },
    });
  } catch (error) {
    console.error("Error creating notification:", error);
    throw error;
  }
}

/**
 * Create a customer added notification
 */
export async function notifyCustomerAdded(userId: string, customerName: string, customerId: string) {
  return createNotification({
    userId,
    type: "customer_added",
    title: "New Customer Added",
    message: `Customer "${customerName}" has been added to your system.`,
    relatedCustomerId: customerId,
  });
}

/**
 * Create a credit added notification
 */
export async function notifyCreditAdded(
  userId: string,
  customerName: string,
  amount: number,
  customerId: string
) {
  return createNotification({
    userId,
    type: "credit_added",
    title: "New Credit Recorded",
    message: `Credit of ₹${amount.toFixed(2)} added for customer "${customerName}".`,
    relatedCustomerId: customerId,
  });
}

/**
 * Create a payment added notification
 */
export async function notifyPaymentAdded(
  userId: string,
  customerName: string,
  amount: number,
  customerId: string
) {
  return createNotification({
    userId,
    type: "payment_added",
    title: "Payment Received",
    message: `Payment of ₹${amount.toFixed(2)} received from customer "${customerName}".`,
    relatedCustomerId: customerId,
  });
}

/**
 * Create an overdue reminder notification
 */
export async function notifyOverdueReminder(
  userId: string,
  customerName: string,
  overdueAmount: number,
  customerId: string
) {
  return createNotification({
    userId,
    type: "overdue_reminder",
    title: "Overdue Payment Reminder",
    message: `Customer "${customerName}" has an outstanding balance of ₹${overdueAmount.toFixed(2)}.`,
    relatedCustomerId: customerId,
  });
}

/**
 * Create a data import notification
 */
export async function notifyDataImport(userId: string, fileName: string, recordCount: number) {
  return createNotification({
    userId,
    type: "import_event",
    title: "Data Import Completed",
    message: `Successfully imported ${recordCount} records from "${fileName}".`,
  });
}

/**
 * Create a data export notification
 */
export async function notifyDataExport(userId: string, exportType: string, recordCount: number) {
  return createNotification({
    userId,
    type: "export_event",
    title: "Data Export Completed",
    message: `Successfully exported ${recordCount} ${exportType} records.`,
  });
}

/**
 * Get user notifications
 */
export async function getUserNotifications(userId: string, limit: number = 10, offset: number = 0) {
  try {
    const [notifications, unreadCount] = await Promise.all([
      prisma.notification.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        take: limit,
        skip: offset,
      }),
      prisma.notification.count({
        where: { userId, isRead: false },
      }),
    ]);

    return { notifications, unreadCount };
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
}

/**
 * Mark notification as read
 */
export async function markNotificationAsRead(notificationId: string) {
  try {
    return await prisma.notification.update({
      where: { id: notificationId },
      data: { isRead: true },
    });
  } catch (error) {
    console.error("Error marking notification as read:", error);
    throw error;
  }
}

/**
 * Mark all notifications as read for a user
 */
export async function markAllNotificationsAsRead(userId: string) {
  try {
    return await prisma.notification.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true },
    });
  } catch (error) {
    console.error("Error marking all notifications as read:", error);
    throw error;
  }
}

/**
 * Delete notification
 */
export async function deleteNotification(notificationId: string) {
  try {
    return await prisma.notification.delete({
      where: { id: notificationId },
    });
  } catch (error) {
    console.error("Error deleting notification:", error);
    throw error;
  }
}
