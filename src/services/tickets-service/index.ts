import ticketRepository from "@/repositories/ticket-repository";
import { TicketType } from "@prisma/client";

async function getAllTicketTypes(): Promise<TicketType[]> {
  return ticketRepository.findMany();
}

const ticketService = {
  getAllTicketTypes
};

export default ticketService;
