import { IBacklogInput } from "../../contracts/backlog";
import {
  clearOrganizations,
  clearProjects,
  clearUsers,
  createBacklogs,
  createOrganizations,
  createProjects,
  createUsers,
} from "../../utils/inMemoryDbHelpers";
import {
  backlogs,
  organizations,
  projects as mockProjects,
  users,
} from "../../utils/mockTestData";
import {
  createBacklog,
  getBacklogById,
  updateBacklogDescription,
  updateBacklogName,
} from "../backlogController";
let organization1Id: number;
let organization2Id: number;

let user1Id: number;
let user2Id: number;

let project1Id: number;
let project2Id: number;
let project3Id: number;

const initSchemaInMemoryDB = async () => {
  let newOrganizations = await createOrganizations(organizations);
  let newUsers = await createUsers(users);
  organization1Id = newOrganizations[0].organizationId;
  organization2Id = newOrganizations[1].organizationId;

  let projectsData = mockProjects.map((p) => ({
    ...p,
    organizationId: organization1Id,
  }));

  let newProjectIds = await createProjects(projectsData);
  user1Id = newUsers[0].userId;
  user2Id = newUsers[1].userId;

  project1Id = newProjectIds[0];
  project2Id = newProjectIds[1];
  project3Id = newProjectIds[2];
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
it("creates backlog successfully", async () => {
  let data: IBacklogInput = {
    projectId: project1Id,
    creatorId: user1Id,
    name: "NewFeature1",
    description: "This is a key feature of the project",
  };
  const expectedBacklog = await createBacklog(data);
  expect.assertions(4);
  expect(expectedBacklog).toBeDefined();
  expect(expectedBacklog?.projectId).toEqual(data.projectId);
  expect(expectedBacklog?.creatorId).toEqual(data.creatorId);
  expect(expectedBacklog?.name).toEqual(data.name);
});
it("fails to create backlog", async () => {
  const errorMsg = "ProjectId, creatorId, name and description are required";
  let data: IBacklogInput = {
    projectId: project1Id,
    creatorId: user1Id,
    name: "NewFeature1",
    description: "This is a key feature of the project",
  };
  await expect(createBacklog({ ...data, projectId: 0 })).rejects.toThrow(
    errorMsg
  );
  await expect(createBacklog({ ...data, creatorId: 0 })).rejects.toThrow(
    errorMsg
  );
  await expect(createBacklog({ ...data, name: "" })).rejects.toThrow(errorMsg);
  await expect(createBacklog({ ...data, description: "" })).rejects.toThrow(
    errorMsg
  );
});
it("updates backlog's name successfully", async () => {
  const newBacklogs = await createBacklogs(
    backlogs.map((b) => ({ ...b, projectId: project1Id, creatorId: user1Id }))
  );
  await updateBacklogName(newBacklogs[0].backlogId, "change backlog name");
  let expectedBacklog = await getBacklogById(newBacklogs[0].backlogId);
  expect.assertions(2);

  expect(expectedBacklog?.name).toEqual("change backlog name");
  await expect(
    updateBacklogName(newBacklogs[0].backlogId, "")
  ).rejects.toThrow();
  // expect(expectedBacklog?.description).toEqual("new description");
});
it("updates backlog's description successfully", async () => {
  const newBacklogs = await createBacklogs(
    backlogs.map((b) => ({ ...b, projectId: project1Id, creatorId: user1Id }))
  );
  await updateBacklogName(newBacklogs[0].backlogId, "new description");
  let expectedBacklog = await getBacklogById(newBacklogs[0].backlogId);
  expect.assertions(2);

  expect(expectedBacklog?.description).toEqual("new description");
  await expect(
    updateBacklogDescription(newBacklogs[0].backlogId, "")
  ).rejects.toThrow();
});
it("deletes backlog successfully", async () => {});
it("fails to delete backlog", async () => {});
it("returns backlog by id", async () => {});
it("returns backlog by project", async () => {});
it("returns backlog by sprint", async () => {});
it("returns backlog by user", async () => {});
