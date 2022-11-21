import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getTicketTypes, getTicketByUser } from "@/controllers";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", getTicketTypes)
  .get("/", getTicketByUser);

export { ticketsRouter };
