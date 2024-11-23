import { z } from "zod";

export const FormCreateSchema = z.object({
  title: z
    .string()
    .min(6, { message: "Minimum six characters are needed" })
    .max(100, {
      message: "Maximum 100 characters are allowed",
    }),
  description: z
    .string()
    .max(500, { message: "Maximum 500 characters are allowed." }),
});

export type FormCreateSchemaType = z.infer<typeof FormCreateSchema>;
