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

async function findWithEnrollmentByTicketId(ticketId: number) {
  return prisma.ticket.findFirst({
    where: { id: ticketId },
    include: {
      Enrollment: true
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

async function updateStatus(
  ticketId: number,
  status: TicketStatus
) {
  return prisma.ticket.update({
    where: { id: ticketId },
    data: { status }
  });
}

const ticketRepository = {
  findMany,
  findWithTicketTypeByEnrollmentId,
  findWithEnrollmentByTicketId,
  create,
  updateStatus
};

export default ticketRepository;
