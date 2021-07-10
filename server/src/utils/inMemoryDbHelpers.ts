import { db, sql } from "..";
import {
  IOrganizationInfo,
  IOrganizationInput,
} from "../contracts/organization";
import { IUserInput } from "../contracts/user";
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

async function clearOrganizations() {
  await db.query(sql`DELETE FROM organization;`);
}

async function clearUsers() {
  await db.query(sql`DELETE FROM users;`);
}

export { createUsers, createOrganizations, clearOrganizations, clearUsers };
