import { prisma } from "@/config";

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

const ticketRepository = {
  findMany,
  findWithTicketTypeByEnrollmentId
};

export default ticketRepository;
