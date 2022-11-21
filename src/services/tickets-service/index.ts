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

async function getOneWithTicketTypeByEnrollmentId(userId: number): Promise<GetTicketWhithTicketType> {
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

export type GetTicketWhithTicketType = Ticket & {
  TicketType: TicketType
};

const ticketService = {
  getAllTicketTypes,
  getOneWithTicketTypeByEnrollmentId
};

export default ticketService;
