import * as z from "zod";

// REGISTER SCHEMA
export const RegisterSchema = z
  .object({
    username: z
      .string()
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores, without spaces",
      )
      .min(1, {
        message: "Username of atleast four characters needed.",
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
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password did not match",
    path: ["confirmPassword"],
  });

// LOGIN SCHEMA
export const LoginSchema = z.object({
  email: z.string().email({
    message: "Not a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Must be of atleast six characters.",
  }),
});

// start form creation
export const StartFormCreationSchema = z.object({
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
