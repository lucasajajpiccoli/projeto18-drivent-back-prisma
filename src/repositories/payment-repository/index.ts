import { prisma } from "@/config";
import { PaymentRequest } from "@/protocols";

async function findByTicketId(ticketId: number) {
  return prisma.payment.findFirst({
    where: { ticketId }
  });
}

async function create(paymentRequest: PaymentRequest) {
  return prisma.payment.create({
    data: paymentRequest
  });
}

const paymentRepository = {
  findByTicketId,
  create
};

export default paymentRepository;
