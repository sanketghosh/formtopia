import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import { z } from "zod";
import swaggerUI from "swagger-ui-express";

// local modules
import swaggerDoc from "@/swagger.json";
import { errorHandler } from "@/middlewares";
import authRoutes from "@/modules/auth/auth.routes";
import healthCheck from "@/modules/health-check";

// app initializer
const app = express();
dotenv.config();

// env parser
const EnvSchema = z.object({
  PORT: z.string(),
  FRONTEND_URL: z.string().url(),
});
const processEnv = EnvSchema.parse(process.env);

// common middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  cors({
    credentials: true,
    origin: processEnv.FRONTEND_URL,
  })
);
app.use(morgan("combined"));

// routes
app.use("/api/v1", healthCheck);
app.use("/api/v1", authRoutes);

// custom middlewares
app.use(errorHandler);

// swagger doc route
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

const SERVER_PORT = processEnv.PORT;
const startServer = () => {
  try {
    app.listen(SERVER_PORT, () => {
      console.log(`Server running on http://localhost:${SERVER_PORT}`);
      console.log(
        `Access API docs on http://localhost:${SERVER_PORT}/api-docs`
      );
    });
  } catch (error) {
    console.error(error);
    process.exit();
  }
};

startServer();
