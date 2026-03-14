import z from "zod";

export const registerHandlerValidation = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string().min(4),
});
