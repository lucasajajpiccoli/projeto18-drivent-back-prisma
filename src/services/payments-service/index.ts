import { notFoundError, unauthorizedError } from "@/errors";
import paymentRepository from "@/repositories/payment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { Payment, TicketStatus } from "@prisma/client";

async function getOnePaymentByTicketId(
  ticketId: number,
  userId: number
): Promise<Payment> {
  const ticketWithEnrollment = await ticketRepository.findWithEnrollmentByTicketId(ticketId);

  if(!ticketWithEnrollment) {
    throw notFoundError();
  }

  if(ticketWithEnrollment.Enrollment.userId !== userId) {
    throw unauthorizedError();
  }

  const payment = await paymentRepository.findByTicketId(ticketId);

  return payment;
}

async function createPayment(
  userId: number,
  paymentCreation: CreatePayment
): Promise<Payment> {
  const ticketWithEnrollment = await ticketRepository.findWithEnrollmentByTicketId(paymentCreation.ticketId);

  if(!ticketWithEnrollment) {
    throw notFoundError();
  }

  if(ticketWithEnrollment.Enrollment.userId !== userId) {
    throw unauthorizedError();
  }

  const ticketWithTicketType = await ticketRepository.findWithTicketTypeByEnrollmentId(ticketWithEnrollment.enrollmentId);

  const payment = await paymentRepository.create({
    ticketId: paymentCreation.ticketId,
    value: ticketWithTicketType.TicketType.price,
    cardIssuer: paymentCreation.cardData.issuer,
    cardLastDigits: paymentCreation.cardData.number.toString().slice(-4)
  });

  await ticketRepository.updateStatus(paymentCreation.ticketId, TicketStatus.PAID);

  return payment;
}

export type CreatePayment = {
  ticketId: number,
  cardData: {
    issuer: string,
    number: number,
    name: string,
    expirationDate: Date,
    cvv: number
  }
};

const paymentService = {
  getOnePaymentByTicketId,
  createPayment
};

export default paymentService;
