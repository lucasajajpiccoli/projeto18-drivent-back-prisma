import { Router } from "express";
import { authenticateToken, validateQuery } from "@/middlewares";
import { getPaymentByTicket } from "@/controllers";
import { getPaymentSchema } from "@/schemas";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", validateQuery(getPaymentSchema), getPaymentByTicket);

export { paymentsRouter };
