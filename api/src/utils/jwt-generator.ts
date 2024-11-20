// PACKAGES
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { z } from "zod";

// init dotenv
dotenv.config();

// LOCAL MODULES
import { TOKEN_EXP_AGE } from "@/constants";

// env parser
const EnvSchema = z.object({
  JWT_SECRET_KEY: z.string(),
});
const processEnv = EnvSchema.parse(process.env);

const jwtSecretKey = processEnv.JWT_SECRET_KEY;

export const jwtGenerator = (userId: string) => {
  const jwtToken = jwt.sign(
    { id: userId },
    process.env.JWT_SECRET_KEY as string,
    { expiresIn: TOKEN_EXP_AGE }
  );

  return {
    jwtToken,
  };
};
