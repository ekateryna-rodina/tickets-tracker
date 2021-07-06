import request from "supertest";
import { createUser } from "../../controllers/userController";
import { app } from "../../index";
import { Roles } from "../../utils/roleEnum";

jest.mock("../../controllers/userController", () => ({
  createUser: jest.fn(),
}));
afterEach(() => {
  jest.clearAllMocks();
});
it("create user route is acessible and validation works well", async () => {
  let validUserData = {
    email: "test2@e.m",
    password: "test",
    role: Roles.User,
  };
  await request(app).post("/api/users/").send(validUserData).expect(200);
  let fields = Object.keys(validUserData);
  expect(createUser).toBeCalledTimes(1);
  for (let i of fields) {
    jest.clearAllMocks();
    await request(app)
      .post("/api/users/")
      .send({ ...validUserData, [i]: "" })
      .expect(400);
    expect(createUser).not.toHaveBeenCalled();
  }
});
