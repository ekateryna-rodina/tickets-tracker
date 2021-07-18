import { db, sql } from "..";
import { IBacklogInfo, IBacklogInput } from "../contracts/backlog";
import { dbEntityToObject } from "../utils/dbHelpers";

const createBacklog = async (
  data: IBacklogInput
): Promise<IBacklogInfo | null> => {
  const {
    projectId,
    creatorId,
    name: nameInput,
    sprintId,
    estimatedAt,
    description: descriptionInput,
  } = data;

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
      completed_at,
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
      completedAt: completed_at,
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
  let updateResponse;
  try {
    if ("name" in data) {
      updateResponse = await db.query(
        sql`UPDATE backlog SET name = ${data.name} WHERE backlog_id = ${backlogId} RETURNING *`
      );
    }
    if ("sprintId" in data) {
      updateResponse = await db.query(
        sql`UPDATE backlog SET sprint_id = ${data.sprintId} WHERE backlog_id = ${backlogId} RETURNING *`
      );
    }
    if ("estimatedAt" in data) {
      updateResponse = await db.query(
        sql`UPDATE backlog SET estimated_at = ${data.estimatedAt} WHERE backlog_id = ${backlogId} RETURNING *`
      );
    }
    if ("completedAt" in data) {
      updateResponse = await db.query(
        sql`UPDATE backlog SET completed_at = ${data.completedAt} WHERE backlog_id = ${backlogId} RETURNING *`
      );
    }

    if ("description" in data) {
      updateResponse = await db.query(
        sql`UPDATE backlog SET description = ${data.description} WHERE backlog_id = ${backlogId} RETURNING *`
      );
    }

    if (!updateResponse || !updateResponse[0]) return null;
    let obj = dbEntityToObject<IBacklogInfo>(updateResponse[0]);
    return obj;
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
