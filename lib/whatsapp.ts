export function formatPhoneForWhatsApp(phone: string): string | null {
  const digits = phone.replace(/\D/g, "");
  if (!digits) return null;

  if (digits.length === 10) return `91${digits}`;
  if (digits.length === 11 && digits.startsWith("0")) return `91${digits.slice(1)}`;
  if (digits.length >= 11 && digits.length <= 15) return digits;

  return null;
}

export function buildReminderMessage(customerName: string, outstandingBalance: number) {
  const amount = outstandingBalance.toFixed(2);

  return `Hello ${customerName},

Your outstanding balance is ₹${amount}.

Please clear your dues.

Thank you.`;
}

export function buildWhatsAppReminderUrl(phone: string, message: string): string | null {
  const formattedPhone = formatPhoneForWhatsApp(phone);
  if (!formattedPhone) return null;

  return `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;
}
