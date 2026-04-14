import z from "zod";

export const registerHandlerValidation = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string().min(4),
  confirmPassword: z.string().min(4),
  role: z.enum(["candidate", "recruiter", "admin"]),
});
// password: z.string().min(4).optional(),

export const loginHandlerValidation = z.object({
  email: z.email(),
  password: z.string(),
});

export const forgotPasswordValidation = z.object({
  email: z.email(),
});

export const resetPasswordValidation = z.object({
  password: z.string(),
  confirmPassword: z.string(),
});

export const updatePasswordValidation = z.object({
  oldPassword: z.string(),
  newPassword: z.string(),
  confirmPassword: z.string(),
});
