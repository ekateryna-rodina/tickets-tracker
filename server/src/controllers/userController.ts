import { db, sql } from "..";
import { IUserInfo, IUserInput, IUserUnsecure } from "../contracts/user";

const createUser = async (data: IUserInput): Promise<IUserUnsecure | null> => {
  const { email: emailInput, password: passwordInput, role } = data;
  if (!emailInput || !passwordInput || !role) {
    throw new Error("Invalid request");
  }
  try {
    const user = await db.query(sql`SELECT *
      FROM insert_user_with_role(
              ${emailInput}::varchar(100),
              ${passwordInput}::varchar,
              ${role}::roles
          );`);

    if (!user[0]) return null;
    const { user_id, email, password, user_role } = user[0];
    return {
      userId: user_id,
      email,
      password,
      role: user_role,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getUserById = async (userId: number): Promise<IUserInfo | null> => {
  if (userId === null) return null;
  try {
    let user = await db.query(
      sql`SELECT * FROM get_user_by_id(${userId}::integer)`
    );
    if (!user[0]) return null;
    const { user_id, email, user_role } = user[0];
    return { userId: user_id, email: email, role: user_role };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export { createUser, getUserById };
