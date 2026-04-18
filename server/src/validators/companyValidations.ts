import z from "zod";

export const updateCompanyInfoValidation = z.object({
  name: z.string(),
});
