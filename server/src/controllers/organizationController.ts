// import pool from "../db";
import { db, sql } from "..";
import {
  IOrganizationInfo,
  IOrganizationInput,
} from "../contracts/organization";

const createOrganization = async (
  data: IOrganizationInput
): Promise<IOrganizationInfo | null> => {
  const { name: nameInput, email: emailInput, logo: logoInput } = data;
  if (!nameInput || !emailInput) {
    throw new Error("Name and email are required");
  }
  try {
    let organizations = await db.query(sql`
    SELECT * from insert_organization(${nameInput}::varchar, 
                                      ${emailInput}::varchar, 
                                      ${new Date().getTime()}::timestamp, 
                                      ${logoInput}::bytea)
    `);
    if (!organizations[0]) return null;
    const { organization_id, email, name, created_at, logo } = organizations[0];
    return {
      organizationId: organization_id,
      email,
      name,
      createdAt: created_at,
      logo,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getOrganizationById = async (
  organizationId: number
): Promise<IOrganizationInfo | null> => {
  if (!organizationId) {
    throw new Error("Organization id is required");
  }
  try {
    const organizations = await db.query(
      sql`SELECT * FROM get_organization_by_id(${organizationId}::int)`
    );
    if (!organizations[0]) return null;
    const { organization_id, email, name, created_at, logo } = organizations[0];
    return {
      organizationId: organization_id,
      email,
      name,
      createdAt: created_at,
      logo,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getOrganizationByUserId = async (
  userId: string
): Promise<IOrganizationInfo | null> => {
  if (!userId) return null;
  try {
    const organizations = await db.query(sql`SELECT *
    FROM get_organization_by_user_id(
            ${Number(userId)}::integer
        );`);
    if (!organizations[0]) return null;

    const { organization_id, name, email, created_at, logo } = organizations[0];
    return {
      organizationId: organization_id,
      name: name,
      email: email,
      createdAt: created_at,
      logo: logo,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};
export { getOrganizationByUserId, createOrganization, getOrganizationById };
