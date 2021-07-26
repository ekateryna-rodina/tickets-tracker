import { db, sql } from "..";
import { IBacklogInput } from "../../../common/contracts/backlog";
import {
  IOrganizationInfo,
  IOrganizationInput,
} from "../../../common/contracts/organization";
import { IProjectInput } from "../../../common/contracts/project";
import { IUserInput } from "../../../common/contracts/user";
import { Roles } from "./roleEnum";

const createUsers = async (mockUsers: IUserInput[]) => {
  let users: { userId: number; email: string; role: Roles.User }[] = [];
  for (let user of mockUsers) {
    let role = user.role.toString();
    const newUserResponse = await db.query(sql`
        SELECT * from insert_user_with_role(${user.email}::varchar, 
                                          ${user.password}::varchar, 
                                          ${role}::roles)
        `);
    const { user_id, email, user_role } = newUserResponse[0];
    users.push({ userId: user_id, email, role: user_role });
  }

  return users;
};

const createOrganizations = async (
  mockOrganizations: IOrganizationInput[]
): Promise<IOrganizationInfo[]> => {
  let organizations: {
    organizationId: number;
    email: string;
    name: string;
    createdAt: any;
    logo: any;
  }[] = [];
  for (let organization of mockOrganizations) {
    const newOrganizationResponse = await db.query(sql`
        SELECT * from insert_organization(${organization.name}::varchar, 
                                          ${organization.email}::varchar, 
                                          ${organization.logo}::bytea)
        `);
    const { organization_id, email, name, created_at, logo } =
      newOrganizationResponse[0];
    organizations.push({
      organizationId: organization_id,
      email,
      name,
      createdAt: created_at,
      logo,
    });
  }

  return organizations;
};

const createProjects = async (mockProjects: IProjectInput[]) => {
  let projectIds = [];
  for (let project of mockProjects) {
    const queryResponse = await db.query(sql`SELECT *
    FROM insert_project(
            ${project.name}::varchar,
            ${project.organizationId}::integer
        );`);
    projectIds.push(queryResponse[0].project_id);
  }
  return projectIds;
};

const createBacklogs = async (mockBacklogs: IBacklogInput[]) => {
  let backlogs = [];
  for (let backlog of mockBacklogs) {
    const backlogResponse =
      await db.query(sql`SELECT * FROM insert_backlog(${backlog.projectId}::integer,
        ${backlog.creatorId}::integer, ${backlog.name}::varchar, ${backlog.description}::varchar, ${backlog.sprintId}::integer, ${backlog.estimatedAt}::timestamp)`);
    backlogs.push({
      ...backlogResponse[0],
      backlogId: backlogResponse[0].backlog_id,
      creatorId: backlogResponse[0].creator_id,
      projectId: backlogResponse[0].project_id,
    });
  }
  return backlogs;
};

async function clearOrganizations() {
  await db.query(sql`DELETE FROM organization;`);
}

async function clearUsers() {
  await db.query(sql`DELETE FROM users;`);
}

async function clearProjects() {
  await db.query(sql`DELETE FROM project;`);
}

async function clearBacklogs() {
  await db.query(sql`DELETE FROM backlog;`);
}

export {
  clearProjects,
  createUsers,
  createOrganizations,
  clearOrganizations,
  clearUsers,
  createProjects,
  createBacklogs,
  clearBacklogs,
};
