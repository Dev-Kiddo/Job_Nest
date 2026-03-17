import z from "zod";

export const registerHandlerValidation = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string().min(4),
});
// password: z.string().min(4).optional(),

export const loginHandlerValidation = z.object({
  email: z.email(),
  password: z.string(),
});
