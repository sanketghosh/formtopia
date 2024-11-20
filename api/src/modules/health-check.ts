import { catchErrors } from "@/utils/catch-errors";
import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";

const router = express.Router();

router.get(
  "/health-check",
  catchErrors(async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      message: "SUCCESS! Everything is working fine.",
    });
  })
);

export default router;
