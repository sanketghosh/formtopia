import { z } from "zod";

// REGISTER SCHEMA
export const RegisterSchema = z.object({
  username: z
    .string()
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores, without spaces"
    )
    .min(1, {
      message: "Username of at least four characters needed.",
    })
    .max(12, {
      message: "Maximum twelve characters acceptable.",
    }),
  email: z.string().email({
    message: "A valid email is required",
  }),
  password: z.string().min(6, {
    message: "At least 6 characters needed.",
  }),
});

// LOGIN SCHEMA
export const LoginSchema = z.object({
  email: z.string().email({
    message: "Not a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Must be of at least six characters.",
  }),
});

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
export type LoginSchemaType = z.infer<typeof LoginSchema>;
