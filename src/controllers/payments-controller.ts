import { AuthenticatedRequest } from "@/middlewares";
import paymentService from "@/services/payments-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getPaymentByTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const ticketId = Number(req.query.ticketId);

  try {
    const payment = await paymentService.getOnePaymentByTicketId(ticketId, userId);

    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if(error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if(error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
  }
}

export async function createPayment(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const paymentCreation = req.body;

  try {
    const payment = await paymentService.createPayment(userId, paymentCreation);

    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if(error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if(error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
  }
}
