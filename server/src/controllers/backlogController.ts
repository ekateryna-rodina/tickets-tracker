import { db, sql } from "..";
import { IBacklogInfo, IBacklogInput } from "../contracts/backlog";
import { composeUpdateQuery } from "../utils/dbHelpers";

const createBacklog = async (
  data: IBacklogInput
): Promise<IBacklogInfo | null> => {
  const {
    projectId,
    creatorId,
    name: nameInput,
    sprintId,
    estimatedAt,
    endedAt,
    description: descriptionInput,
  } = data;

  console.log("dataaa");
  console.log(data);
  if (!projectId || !creatorId || !nameInput || !descriptionInput) {
    throw new Error("ProjectId, creatorId, name and description are required");
  }
  try {
    const backlogResponse =
      await db.query(sql`SELECT * FROM insert_backlog(${projectId}::integer,
        ${creatorId}::integer, ${nameInput}::varchar, ${descriptionInput}::varchar, ${sprintId}::integer, ${estimatedAt}::timestamp)`);
    if (!backlogResponse[0]) return null;
    const {
      backlog_id,
      project_id,
      creator_id,
      name,
      sprint_id,
      estimated_at,
      ended_at,
      description,
      created_at,
    } = backlogResponse[0];
    return {
      backlogId: backlog_id,
      projectId: project_id,
      creatorId: creator_id,
      name,
      sprintId: sprint_id,
      estimatedAt: estimated_at,
      createdAt: created_at,
      endedAt: ended_at,
      description,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

const deleteBacklog = async (backlogId: number): Promise<number | null> => {
  if (!backlogId) {
    throw new Error("BacklogId is required");
  }
  try {
    const backlogResponse = await db.query(
      sql`SELECT * FROM delete_backlog(${backlogId}::integer)`
    );
    const { backlog_id } = backlogResponse[0];
    return backlog_id;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updateBacklog = async (backlogId: number, data: IBacklogInput) => {
  if ("projectId" in data || "creatorId" in data) {
    throw new Error("Cannot update project and creator data");
  }

  const query = composeUpdateQuery<IBacklogInput>("backlog", data, backlogId);

  try {
    await db.query(sql`${query}`);
    // has to return record data
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getBacklogById = async (
  backlogId: number
): Promise<IBacklogInfo | null> => {
  if (!backlogId) {
    throw new Error("BacklogId must be provided");
  }
  try {
    const backlogResponse = await db.query(
      sql`SELECT * FROM get_backlog_by_id(${backlogId}::integer)`
    );
    return backlogResponse[0];
  } catch (error) {
    console.log(error);
    return null;
  }
};

export { createBacklog, deleteBacklog, updateBacklog, getBacklogById };
