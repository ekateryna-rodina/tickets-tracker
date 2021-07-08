import { db, sql } from "..";
import { Roles } from "../utils/roleEnum";
interface IUser {
  email: string;
  password: string;
  role: Roles;
}

const createUser = async (data: IUser) => {
  const { email, password, role } = data;
  const user = await db.query(sql`SELECT *
    FROM insert_user_with_role(
            ${email}::varchar(100),
            ${password}::varchar,
            ${role}::roles
        );`);
  return user;
};

const getUser = async (userId: number) => {
  if (userId === null) return null;
  let user = await db.query(
    sql`SELECT * FROM get_user_by_id(${userId}::integer)`
  );
  if (!user[0]) return null;
  const { user_id, email, user_role } = user[0];
  return { userId: user_id, email: email, role: user_role };
};

export { createUser, getUser };
