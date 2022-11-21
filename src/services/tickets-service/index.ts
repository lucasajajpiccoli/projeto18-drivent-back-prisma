import { notFoundError } from "@/errors";
import ticketRepository from "@/repositories/ticket-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { Enrollment, Ticket, TicketType } from "@prisma/client";

async function getAllTicketTypes(): Promise<TicketType[]> {
  return ticketRepository.findMany();
}

async function getOneEnrollmentByUserId(userId: number): Promise<Enrollment> {
  return enrollmentRepository.findByUserId(userId);
}

async function getOneWithTicketTypeByEnrollmentId(userId: number): Promise<TicketWithTicketType> {
  const enrollment = await getOneEnrollmentByUserId(userId);

  if(!enrollment) {
    throw notFoundError();
  }

  const ticketWithTicketType = await ticketRepository.findWithTicketTypeByEnrollmentId(enrollment.id);

  if(!ticketWithTicketType) {
    throw notFoundError();
  }

  return ticketWithTicketType;
}

async function createTicket(
  userId: number,
  ticketTypeId: number
): Promise<TicketWithTicketType> {
  const enrollment = await getOneEnrollmentByUserId(userId);

  if(!enrollment) {
    throw notFoundError();
  }

  const ticketWithTicketType = await ticketRepository.create(ticketTypeId, enrollment.id);
  
  return ticketWithTicketType;
}

type TicketWithTicketType = Ticket & {
  TicketType: TicketType
};

const ticketService = {
  getAllTicketTypes,
  getOneWithTicketTypeByEnrollmentId,
  createTicket
};

export default ticketService;
