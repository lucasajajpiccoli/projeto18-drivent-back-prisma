import { prisma } from "@/config";
import { TicketStatus } from "@prisma/client";

async function findMany() {
  return prisma.ticketType.findMany();
}

async function findWithTicketTypeByEnrollmentId(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: { enrollmentId },
    include: {
      TicketType: true
    }
  });
}

async function create(
  ticketTypeId: number,
  enrollmentId: number
) {
  return prisma.ticket.create({
    data: {
      ticketTypeId,
      enrollmentId,
      status: TicketStatus.RESERVED
    },
    include: {
      TicketType: true
    }
  });
}

const ticketRepository = {
  findMany,
  findWithTicketTypeByEnrollmentId,
  create
};

export default ticketRepository;
