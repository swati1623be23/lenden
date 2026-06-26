import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export const customerSchema = z.object({
  name: z.string().min(2, "Name is required."),
  phone: z.string().max(20).optional(),
  address: z.string().max(200).optional(),
});

export const creditSchema = z.object({
  customerId: z.string().trim().min(1, "Customer is required."),
  amount: z.coerce.number().positive("Amount must be greater than 0."),
  note: z.string().max(255).optional(),
  date: z.string().min(1, "Date is required."),
});

export const paymentSchema = z.object({
  customerId: z.string().trim().min(1, "Customer is required."),
  amount: z.coerce.number().positive("Amount must be greater than 0."),
  date: z.string().min(1, "Date is required."),
});

export const settingsSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    email: z.string().email("Enter a valid email address."),
    currentPassword: z.string().optional(),
    newPassword: z.string().optional(),
    confirmPassword: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const changingPassword = Boolean(data.currentPassword || data.newPassword || data.confirmPassword);

    if (!changingPassword) return;

    if (!data.currentPassword || data.currentPassword.length < 6) {
      ctx.addIssue({
        code: "custom",
        message: "Current password is required.",
        path: ["currentPassword"],
      });
    }

    if (!data.newPassword || data.newPassword.length < 6) {
      ctx.addIssue({
        code: "custom",
        message: "New password must be at least 6 characters.",
        path: ["newPassword"],
      });
    }

    if (data.newPassword !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match.",
        path: ["confirmPassword"],
      });
    }
  });

export const shopSettingsSchema = z.object({
  shopName: z.string().min(2, "Shop name must be at least 2 characters.").optional(),
  shopPhone: z.string().max(20).optional(),
  shopAddress: z.string().max(255).optional(),
});

export const profilePhotoSchema = z.object({
  profilePhotoUrl: z.string().url("Invalid image URL").optional(),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type CustomerInput = z.infer<typeof customerSchema>;
export type CreditInput = z.infer<typeof creditSchema>;
export type PaymentInput = z.infer<typeof paymentSchema>;
export type SettingsInput = z.infer<typeof settingsSchema>;
export type ShopSettingsInput = z.infer<typeof shopSettingsSchema>;
export type ProfilePhotoInput = z.infer<typeof profilePhotoSchema>;
