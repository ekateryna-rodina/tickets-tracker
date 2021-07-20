import { db, sql } from "..";
import { ITicketInfo, ITicketInput } from "../contracts/ticket";
import { dbEntityToObject } from "../utils/dbHelpers";
import { Priority } from "../utils/priorityEnum";
import { TicketStatus } from "../utils/ticketStatusEnum";
import { TicketType } from "../utils/ticketTypeEnum";

const createTicket = async (data: ITicketInput) => {
  const {
    backlogId,
    creatorId,
    name,
    type,
    estimatedAt,
    description,
    status,
    priority,
    environment,
    branch,
  } = data;
  if (!backlogId || !creatorId || !name || !environment || !branch) {
    throw new Error(
      "BacklogId, creatorId, name, environment and branch must be are required"
    );
  }
  try {
    const ticketResponse =
      await db.query(sql`SELECT * FROM insert_ticket(${backlogId}::integer,
            ${creatorId}::integer, 
            ${name}::varchar, 
            ${type}::TicketType, 
            ${status}::TicketStatus, 
            ${priority}::Priority, 
            ${environment}::varchar, 
            ${branch}::varchar, 
            ${estimatedAt}::timestamp, 
            ${description}::varchar)`);
    if (!ticketResponse[0]) return null;
    let obj = dbEntityToObject<ITicketInfo>(ticketResponse[0]);
    return obj;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updateTicketBacklog = async (ticketId: number, backlogId: number) => {
  let updateResponse;
  if (!ticketId || !backlogId) throw new Error("Inavalid request");
  try {
    updateResponse = await db.query(
      sql`UPDATE ticket SET backlog_id = ${backlogId} WHERE ticket_id = ${ticketId} RETURNING *`
    );
    if (!updateResponse || !updateResponse[0]) return null;
    let obj = dbEntityToObject<ITicketInfo>(updateResponse[0]);
    return obj;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updateTicketName = async (ticketId: number, name: string) => {
  let updateResponse;
  if (!ticketId || !name) throw new Error("Inavalid request");
  try {
    updateResponse = await db.query(
      sql`UPDATE ticket SET name = ${name} WHERE ticket_id = ${ticketId} RETURNING *`
    );
    if (!updateResponse || !updateResponse[0]) return null;
    let obj = dbEntityToObject<ITicketInfo>(updateResponse[0]);
    return obj;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updateTicketType = async (ticketId: number, type: TicketType) => {
  let updateResponse;
  if (!ticketId || !type) throw new Error("Inavalid request");
  try {
    updateResponse = await db.query(
      sql`UPDATE ticket SET type = ${type} WHERE ticket_id = ${ticketId} RETURNING *`
    );
    if (!updateResponse || !updateResponse[0]) return null;
    let obj = dbEntityToObject<ITicketInfo>(updateResponse[0]);
    return obj;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updateTicketEstimationDate = async (
  ticketId: number,
  estimatedAt: string
) => {
  let updateResponse;
  if (!ticketId || !estimatedAt) throw new Error("Inavalid request");
  try {
    updateResponse = await db.query(
      sql`UPDATE ticket SET esimated_at = ${estimatedAt} WHERE ticket_id = ${ticketId} RETURNING *`
    );
    if (!updateResponse || !updateResponse[0]) return null;
    let obj = dbEntityToObject<ITicketInfo>(updateResponse[0]);
    return obj;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updateTicketCompletionDate = async (
  ticketId: number,
  completedAt: string
) => {
  let updateResponse;
  if (!ticketId || !completedAt) throw new Error("Inavalid request");
  try {
    updateResponse = await db.query(
      sql`UPDATE ticket SET completed_at = ${completedAt} WHERE ticket_id = ${ticketId} RETURNING *`
    );
    if (!updateResponse || !updateResponse[0]) return null;
    let obj = dbEntityToObject<ITicketInfo>(updateResponse[0]);
    return obj;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updateTicketDescription = async (
  ticketId: number,
  description: string
) => {
  let updateResponse;
  if (!ticketId || !description) throw new Error("Inavalid request");
  try {
    updateResponse = await db.query(
      sql`UPDATE ticket SET description = ${description} WHERE ticket_id = ${ticketId} RETURNING *`
    );
    if (!updateResponse || !updateResponse[0]) return null;
    let obj = dbEntityToObject<ITicketInfo>(updateResponse[0]);
    return obj;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updateTicketStatus = async (ticketId: number, status: TicketStatus) => {
  let updateResponse;
  if (!ticketId || !status) throw new Error("Inavalid request");
  try {
    updateResponse = await db.query(
      sql`UPDATE ticket SET status = ${status} WHERE ticket_id = ${ticketId} RETURNING *`
    );
    if (!updateResponse || !updateResponse[0]) return null;
    let obj = dbEntityToObject<ITicketInfo>(updateResponse[0]);
    return obj;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updateTicketPriority = async (ticketId: number, priority: Priority) => {
  let updateResponse;
  if (!ticketId || !priority) throw new Error("Inavalid request");
  try {
    updateResponse = await db.query(
      sql`UPDATE ticket SET priority = ${priority} WHERE ticket_id = ${ticketId} RETURNING *`
    );
    if (!updateResponse || !updateResponse[0]) return null;
    let obj = dbEntityToObject<ITicketInfo>(updateResponse[0]);
    return obj;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updateTicketEnvironment = async (
  ticketId: number,
  environment: string
) => {
  let updateResponse;
  if (!ticketId || !environment) throw new Error("Inavalid request");
  try {
    updateResponse = await db.query(
      sql`UPDATE ticket SET environment = ${environment} WHERE ticket_id = ${ticketId} RETURNING *`
    );
    if (!updateResponse || !updateResponse[0]) return null;
    let obj = dbEntityToObject<ITicketInfo>(updateResponse[0]);
    return obj;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updateTicketBranch = async (ticketId: number, branch: string) => {
  let updateResponse;
  if (!ticketId || !branch) throw new Error("Inavalid request");
  try {
    updateResponse = await db.query(
      sql`UPDATE ticket SET branch = ${branch} WHERE ticket_id = ${ticketId} RETURNING *`
    );
    if (!updateResponse || !updateResponse[0]) return null;
    let obj = dbEntityToObject<ITicketInfo>(updateResponse[0]);
    return obj;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const deleteTicketById = async (ticketId: number) => {
  if (!ticketId) {
    throw new Error("TicketId must be provided");
  }
  try {
    let deleteResponse = await db.query(
      sql`DELETE FROM ticket WHERE ticket_id = ${ticketId} RETURNING ticket_id`
    );

    return dbEntityToObject<ITicketInfo>(deleteResponse[0]);
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getTicketById = async (ticketId: number): Promise<ITicketInfo | null> => {
  if (!ticketId) {
    throw new Error("TicketId must be provided");
  }
  try {
    const ticketResponse = await db.query(
      sql`SELECT * FROM get_ticket_by_id(${ticketId}::integer)`
    );
    let obj = dbEntityToObject<ITicketInfo>(ticketResponse[0]);
    return obj;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getTicketsByBacklogId = (backlogId: number) => {};

const getTicketsByUserId = (userId: number) => {};

export {
  createTicket,
  getTicketById,
  updateTicketBacklog,
  updateTicketName,
  updateTicketType,
  updateTicketDescription,
  updateTicketStatus,
  updateTicketPriority,
  updateTicketEnvironment,
  updateTicketBranch,
  deleteTicketById,
};
