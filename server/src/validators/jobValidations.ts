import z from "zod";

export const jobValidations = z.object({
  title: z.string(),
  description: z.string(),
  companyId: z.string(),
  category: z.string(),
  salary: z.object({
    min: z.number(),
    max: z.number(),
  }),
  location: z.object({
    city: z.string(),
    state: z.string(),
    country: z.string(),
  }),
});
