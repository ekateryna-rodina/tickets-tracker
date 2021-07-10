import { db, sql } from "..";
import { IProjectInfo, IProjectInput } from "../contracts/project";
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
const getProjectById = async (projectId: string | null | undefined) => {
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
const getProjectsByOrganizationId = async (organizationId: string) => {
  try {
    const queryResponse = await db.query(sql`SELECT *
              FROM get_projects_by_organization_id(
                      ${Number(organizationId)}::integer
                  );`);

    return _getProjectsFromQueryResponse(queryResponse);
  } catch (error) {
    console.log(error);
  }
};

const getProjectsByUserId = async (userId: string) => {
  try {
    const queryResponse = await db.query(sql`SELECT *
                  FROM get_projects_by_user_id(
                          ${Number(userId)}::integer
                      );`);
    return _getProjectsFromQueryResponse(queryResponse);
  } catch (error) {
    console.log(error);
  }
};

export {
  createProject,
  getProjectById,
  getProjectsByOrganizationId,
  getProjectsByUserId,
};
