import { IOrganization } from "../../contracts/organization";
import { IUserInfo } from "../../contracts/user";
import { Roles } from "../../utils/roleEnum";
import { canAccessOrganization } from "../organization";

let user: IUserInfo = {
  userId: "1",
  email: "email",
  role: Roles.User,
};
let organization: IOrganization = {
  organizationId: 2,
  name: "org",
  email: "mail",
  createdAt: "",
  logo: "",
};
jest.mock("../../controllers/organizationController", () => ({
  getOrganizationByUserId: jest
    .fn()
    .mockImplementation(() => Promise.resolve(organization)),
}));

it("returns true if user belongs to organization", async () => {
  let result = await canAccessOrganization(user, 2);
  expect(result).toEqual(true);
});
it("returns false if user does not belong to organization", async () => {
  let result = await canAccessOrganization(user, 3);
  expect(result).toEqual(false);
});
