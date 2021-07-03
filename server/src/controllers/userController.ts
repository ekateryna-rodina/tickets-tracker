import pool from "../db";
import { Roles } from "../utils/roleEnum";
interface IUser {
  email: string;
  password: string;
  role: Roles;
}

const createUser = async (data: IUser) => {
  const { email, password, role } = data;
  const queryResponse = await pool.query(
    `SELECT *
    FROM insert_user_with_role(
            $1::varchar(100),
            $2::varchar,
            $3::roles
        );`,
    [email, password, role]
  );
  if (!queryResponse?.rows[0]) return null;
  return queryResponse.rows[0];
};

const getUser = async (userId: number) => {
  if (userId === null) return null;
  let queryResponse = await pool.query(
    `SELECT * FROM get_user_by_id($1::integer)`,
    [userId]
  );
  if (!queryResponse?.rows[0]) return null;
  const { user_id, email, user_role } = queryResponse?.rows[0];
  return { userId: user_id, email: email, role: user_role };
};

export { createUser, getUser };
