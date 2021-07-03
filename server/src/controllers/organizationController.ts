import pool from "../db";

const getOrganizationByUserId = async (userId: string) => {
  const queryResponse = await pool.query(
    `SELECT *
      FROM get_organization_by_user_id(
              $1::integer
          );`,
    [Number(userId)]
  );
  if (!queryResponse?.rows[0]) return null;

  const { organization_id, name, email, created_at, logo } =
    queryResponse.rows[0];
  return {
    id: organization_id,
    name: name,
    email: email,
    createdAt: created_at,
    logo: logo,
  };
};
export { getOrganizationByUserId };
