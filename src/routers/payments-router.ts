import { Router } from "express";
import { authenticateToken, validateQuery, validateBody } from "@/middlewares";
import { getPaymentByTicket, createPayment } from "@/controllers";
import { getPaymentSchema, createOnePayment } from "@/schemas";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", validateQuery(getPaymentSchema), getPaymentByTicket)
  .post("/process", validateBody(createOnePayment), createPayment);

export { paymentsRouter };
