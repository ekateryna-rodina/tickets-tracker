// import { IOrganizationInfo } from "../../contracts/organization";
// import { IProjectInfo } from "../../contracts/project";
// import { IUserInfo } from "../../contracts/user";
import { Organization } from "../../../../common/contracts/organization";
import { IProjectInfo } from "../../../../common/contracts/project";
import { IUserInfo } from "../../../../common/contracts/user";
import { Roles } from "../../utils/roleEnum";
import { canAccessProject } from "../project";

let user: IUserInfo = {
  userId: "1",
  email: "email",
  role: Roles.Organization,
};
let project: IProjectInfo = {
  projectId: "1",
  name: "project",
  organizationId: 1,
};
let organization: Organization = {
  organizationId: 1,
  name: "org",
  email: "email",
  createdAt: "",
};
let scopedProjects = [project, { ...project, id: 2 }];
jest.mock("../../controllers/organizationController", () => ({
  getOrganizationByUserId: jest
    .fn()
    .mockImplementation(() => Promise.resolve(organization)),
}));
jest.mock("../../controllers/projectController", () => ({
  getProjectsByOrganizationId: jest
    .fn()
    .mockImplementation((organizationId: string) =>
      Promise.resolve(scopedProjects)
    ),
  getProjectsByUserId: jest
    .fn()
    .mockImplementation((userId: string) => Promise.resolve(scopedProjects)),
}));
it("return false if roles are admin or superadmin or there is no user/projectId", async () => {
  let invalidRoles = [Roles.Admin, Roles.Superadmin];
  for (let i of invalidRoles) {
    let result = await canAccessProject({ ...user, role: i }, project);
    expect(result).toEqual(false);
  }

  let result = await canAccessProject(null, project);
  expect(result).toEqual(false);

  result = await canAccessProject(user, null as any);
  expect(result).toEqual(false);
});
it("returns true if organization tries to access scoped project", async () => {
  let result = await canAccessProject(user, project);
  expect(result).toEqual(true);
});
it("returns false if organization tries to access project, which does not belong to it", async () => {
  let result = await canAccessProject(user, { ...project, projectId: "10" });
  expect(result).toEqual(false);
});
it("returns true if user or manager try to access project, which is available to them", async () => {
  let roles = [Roles.Superuser, Roles.User];
  for (let i of roles) {
    let result = await canAccessProject({ ...user, role: i }, project);
    expect(result).toEqual(true);
  }
});
it("returns false if user or manager try to access project, which is not available to them", async () => {
  let roles = [Roles.Superuser, Roles.User];
  for (let i of roles) {
    let result = await canAccessProject(
      { ...user, role: i },
      { ...project, projectId: "25" }
    );
    expect(result).toEqual(false);
  }
});
