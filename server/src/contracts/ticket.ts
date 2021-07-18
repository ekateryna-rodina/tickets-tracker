import { Priority } from "../utils/priorityEnum";
import { TicketStatus } from "../utils/ticketStatusEnum";
import { TicketType } from "../utils/ticketTypeEnum";

export interface ITicketInput {
  backlogId?: number;
  creatorId?: number;
  name?: string;
  type: TicketType;
  estimatedAt?: string;
  completedAt?: string;
  description?: string;
  attachments?: [];
  status: TicketStatus;
  priority: Priority;
  environment: string;
  branch: string;
}

export interface ITicketInfo extends ITicketInput {
  ticketId: number;
  createdAt: string;
}
