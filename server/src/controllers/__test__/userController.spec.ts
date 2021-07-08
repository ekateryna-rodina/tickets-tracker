import { IUserInput } from "../../contracts/user";
import { db, sql } from "../../index";
import { Roles } from "../../utils/roleEnum";
import { createUser, getUserById } from "../userController";

it("creates new user", async () => {
  // assert
  let user: IUserInput = {
    email: "test@test.test",
    password: "1",
    role: Roles.User,
  };
  //act
  await createUser(user);
  // expect
  expect.assertions(1);
  expect(await db.query(sql`SELECT user_id, email FROM users`)).toEqual([
    { user_id: expect.any(Number), email: "test@test.test" },
  ]);
});

it("throws an error if request is invalid create new user", async () => {
  // assert
  let user = { email: "", password: "1", role: Roles.User };
  // act/expect
  expect.assertions(1);
  await expect(createUser(user)).rejects.toThrow("Invalid request");
});

it("returns a user by id", async () => {
  // assert
  const user = {
    email: "showmetheuser@gmail.com",
    password: "any",
    role: Roles.User,
  };
  let newUser = await createUser(user);
  // act
  let expectedUser = await getUserById(+newUser!.userId);
  expect.assertions(2);
  expect(expectedUser).toBeDefined();
  expect(expectedUser?.email).toEqual(user.email);
});

it("returns null if user id is not provided", async () => {
  let expectedUser = await getUserById(0);
  expect.assertions(1);
  expect(expectedUser).toEqual(null);
});
