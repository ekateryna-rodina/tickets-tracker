// import pool from "../db";
import { db, sql } from "..";
const getOrganizationByUserId = async (userId: string) => {
  console.log(userId);
  const organization = await db.query(sql`SELECT *
      FROM get_organization_by_user_id(
              ${Number(userId)}::integer
          );`);
  // if (!queryResponse?.rows[0]) return null;

  // const { organization_id, name, email, created_at, logo } =
  //   queryResponse.rows[0];
  // return {
  //   id: organization_id,
  //   name: name,
  //   email: email,
  //   createdAt: created_at,
  //   logo: logo,
  // };
  return organization[0];
};
export { getOrganizationByUserId };
