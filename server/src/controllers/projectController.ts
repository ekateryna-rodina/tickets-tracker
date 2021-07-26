import { db, sql } from "..";
import {
  IProjectInfo,
  IProjectInput,
  IUserProjectInfo,
} from "../../../common/contracts/project";
import { getOrganizationById } from "./organizationController";

const _getProjectsFromQueryResponse = (queryResponse: any) => {
  let projects: IProjectInfo[] = [];
  if (queryResponse?.length > 0) {
    projects = queryResponse.map((p: any) => ({
      projectId: p.project_id,
      name: p.name,
      organizationId: p.organization_id,
      createdAt: p.created_at,
    }));
  }
  return projects;
};
const createProject = async (data: IProjectInput) => {
  const { name, organizationId } = data;
  if (!name || !organizationId) {
    throw new Error("Name and organization id are required");
  }

  const organization = await getOrganizationById(organizationId);
  if (!organization) {
    throw new Error("Invalid request");
  }
  const queryResponse = await db.query(sql`SELECT *
                    FROM insert_project(
                            ${name}::varchar,
                            ${organizationId}::integer
                        );`);
  return _getProjectsFromQueryResponse(queryResponse)[0] || null;
};
const getProjectById = async (projectId: number | null | undefined) => {
  if (!projectId) return null;
  try {
    const queryResponse = await db.query(sql`SELECT *
                    FROM get_project_by_id(
                            ${Number(projectId)}::integer
                        );`);
    return _getProjectsFromQueryResponse(queryResponse)[0] || null;
  } catch (error) {
    console.log(error);
  }
};
const getProjectsByOrganizationId = async (organizationId: number) => {
  try {
    const queryResponse = await db.query(sql`SELECT *
              FROM get_projects_by_organization_id(
                      ${organizationId}::integer
                  );`);

    return _getProjectsFromQueryResponse(queryResponse);
  } catch (error) {
    console.log(error);
    return null;
  }
};

// likely to be user to assign qa and pm to a project
const assignProjectToUser = async (
  userId: number,
  projectId: number
): Promise<null | IUserProjectInfo> => {
  if (!projectId || !userId) {
    throw new Error("UserId and projectId are required");
  }

  // foreign key in db constraint must throw an exception if project or user don't exist
  try {
    await db.query(
      sql`INSERT INTO project_user(user_id, project_id) VALUES(${userId}::integer, ${projectId}::integer)`
    );
    return { userId, projectId };
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getProjectsByUserId = async (userId: number) => {
  try {
    const queryResponse = await db.query(sql`SELECT *
                  FROM get_projects_by_user_id(
                          ${userId}::integer
                      );`);
    return _getProjectsFromQueryResponse(queryResponse);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export {
  createProject,
  getProjectById,
  getProjectsByOrganizationId,
  getProjectsByUserId,
  assignProjectToUser,
};
