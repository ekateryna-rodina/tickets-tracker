import { IProjectInput } from "../../contracts/project";
import {
  clearOrganizations,
  clearProjects,
  clearUsers,
  createOrganizations,
  createUsers,
} from "../../utils/inMemoryDbHelpers";
import {
  organizations,
  projects as mockProjects,
  users,
} from "../../utils/mockTestData";
import {
  assignProjectToUser,
  createProject,
  getProjectById,
  getProjectsByOrganizationId,
  getProjectsByUserId,
} from "../projectController";
let organization1Id: number;
let organization2Id: number;

let user1Id: number;
let user2Id: number;

const initSchemaInMemoryDB = async () => {
  let newOrganizations = await createOrganizations(organizations);
  let newUsers = await createUsers(users);
  organization1Id = newOrganizations[0].organizationId;
  organization2Id = newOrganizations[1].organizationId;

  user1Id = newUsers[0].userId;
  user2Id = newUsers[1].userId;
};
const clearSchemaInMemoryDB = async () => {
  await clearProjects();
  await clearOrganizations();
  await clearUsers();
};
beforeEach(async () => {
  return await initSchemaInMemoryDB();
});

afterEach(async () => {
  return await clearSchemaInMemoryDB();
});

it("creates projects successfully", async () => {
  const projectData = { name: "project" };
  let project = await createProject({
    ...projectData,
    organizationId: organization1Id,
  });
  expect.assertions(3);
  expect(project).toBeDefined();
  expect(project?.name).toEqual(projectData.name);
  expect(project?.organizationId).toEqual(organization1Id);
});

it("fails to create project if name or organizationId are not provided or organization does not exist", async () => {
  expect.assertions(2);
  await expect(
    createProject({ name: "", organizationId: organization1Id })
  ).rejects.toThrow("Name and organization id are required");

  await expect(
    createProject({ name: "anyname", organizationId: 33 })
  ).rejects.toThrow("Invalid request");
});

it("gets project by id", async () => {
  const projectData = { name: "project1" };
  let newProject = await createProject({
    ...projectData,
    organizationId: organization1Id,
  });
  let expectedProject = await getProjectById(+newProject?.projectId);
  expect.assertions(3);
  expect(expectedProject).toBeDefined();
  expect(expectedProject?.name).toEqual(projectData.name);
  expect(expectedProject?.organizationId).toEqual(organization1Id);
});

it("returns null on get project by id if project does not exist", async () => {
  let expectedProject = await getProjectById(77);
  expect.assertions(1);
  expect(expectedProject).toEqual(null);
});

it("gets projects by organization id", async () => {
  let newProjects = [];
  let projectsData: IProjectInput[] = [
    { name: "project1", organizationId: organization1Id },
    { name: "project2", organizationId: organization1Id },
    { name: "project3", organizationId: organization2Id },
  ];
  for (let prD of projectsData) {
    let project = await createProject(prD);
    newProjects.push(project);
  }
  expect(newProjects.length).toEqual(3);
  expect(newProjects[0].organizationId).toEqual(organization1Id);
  expect(newProjects[1].organizationId).toEqual(organization1Id);
  expect(newProjects[2].organizationId).toEqual(organization2Id);
});

it("assignes project to user successfully", async () => {
  const project1 = await createProject({
    ...mockProjects[0],
    organizationId: organization1Id,
  });
  const project2 = await createProject({
    ...mockProjects[1],
    organizationId: organization1Id,
  });
  const user1ProjectResponse = await assignProjectToUser(
    user1Id,
    +project1.projectId
  );
  const user2ProjectResponse = await assignProjectToUser(
    user2Id,
    +project2.projectId
  );

  expect.assertions(6);
  expect(user1ProjectResponse).toBeDefined();
  expect(user2ProjectResponse).toBeDefined();
  expect(user1ProjectResponse?.userId).toEqual(user1Id);
  expect(user1ProjectResponse?.projectId).toEqual(+project1.projectId);
  expect(user2ProjectResponse?.userId).toEqual(user2Id);
  expect(user2ProjectResponse?.projectId).toEqual(+project2.projectId);
});

it("fails to assignProjectToUser", async () => {
  const project2 = await createProject({
    ...mockProjects[1],
    organizationId: organization1Id,
  });

  expect(await assignProjectToUser(user2Id, 985)).toEqual(null);
  expect(await assignProjectToUser(374, +project2.projectId)).toEqual(null);
});

it("gets projects by user id", async () => {
  const project1 = await createProject({
    ...mockProjects[0],
    organizationId: organization1Id,
  });
  const project2 = await createProject({
    ...mockProjects[1],
    organizationId: organization1Id,
  });

  await assignProjectToUser(user1Id, +project1?.projectId);
  await assignProjectToUser(user2Id, +project2?.projectId);

  const projectsUser1 = await getProjectsByUserId(user1Id);
  const projectsUser2 = await getProjectsByUserId(user2Id);
  expect.assertions(2);

  expect(projectsUser1?.length).toEqual(1);
  expect(projectsUser2?.length).toEqual(1);
});

it("fails to get projects by organization id", async () => {
  const projects = await getProjectsByOrganizationId(656);
  expect.assertions(1);

  expect(projects).toEqual(null);
});

it("fails to get projects by id", async () => {
  const projects = await getProjectById(656);
  expect.assertions(1);

  expect(projects).toEqual(null);
});

it("fails to get projects by user id", async () => {
  const projects = await getProjectsByUserId(656);
  expect.assertions(1);

  expect(projects?.length).toEqual(0);
});
