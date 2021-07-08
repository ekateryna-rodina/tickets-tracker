import { db, sql } from "../../index";
import { Roles } from "../../utils/roleEnum";
import { createUser } from "../userController";

it("creates new user", async () => {
  let user = { email: "test@test.test", password: "1", role: Roles.User };
  await createUser(user);
  expect(await db.query(sql`SELECT user_id, email FROM users`)).toEqual([
    { user_id: expect.any(Number), email: "test@test.test" },
  ]);
});
