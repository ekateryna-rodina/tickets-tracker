import { db, sql } from "..";
import { IProject } from "../contracts/project";

const _getProjectsFromQueryResponse = (queryResponse: any) => {
  let projects: IProject[] = [];
  if (queryResponse?.rows.length > 0) {
    projects = queryResponse.rows.map((p: any) => ({
      projectId: p.project_id,
      name: p.name,
    }));
  }
  return projects;
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

export { getProjectById, getProjectsByOrganizationId, getProjectsByUserId };
