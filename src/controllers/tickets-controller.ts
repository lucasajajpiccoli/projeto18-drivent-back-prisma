import { AuthenticatedRequest } from "@/middlewares";
import ticketService from "@/services/tickets-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getTicketTypes(_req: AuthenticatedRequest, res: Response) {
  try {
    const TicketTypes = await ticketService.getAllTicketTypes();
    return res.status(httpStatus.OK).send(TicketTypes);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}