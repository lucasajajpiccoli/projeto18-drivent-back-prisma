import { notFoundError, unauthorizedError } from "@/errors";
import paymentRepository from "@/repositories/payment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { Payment } from "@prisma/client";

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

const paymentService = {
  getOnePaymentByTicketId
};

export default paymentService;
