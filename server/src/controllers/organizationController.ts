// import pool from "../db";
import { db, sql } from "..";
import { IOrganization, IOrganizationInput } from "../contracts/organization";

const createOrganization = async (data: IOrganizationInput){
  
}

const getOrganizationByUserId = async (
  userId: string
): Promise<IOrganization | null> => {
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
export { getOrganizationByUserId };
