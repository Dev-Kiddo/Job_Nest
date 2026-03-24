import z from "zod";

export const registerHandlerValidation = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string().min(4),
  confirmPassword: z.string().min(4),
  role: z.enum(["seeker", "recruiter", "admin"]),
});
// password: z.string().min(4).optional(),

export const loginHandlerValidation = z.object({
  email: z.email(),
  password: z.string(),
});

export const forgotPasswordValidation = z.object({
  email: z.email(),
});
