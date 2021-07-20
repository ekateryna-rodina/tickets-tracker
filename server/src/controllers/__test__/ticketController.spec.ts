import {
  clearBacklogs,
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
  tickets,
  users,
} from "../../utils/mockTestData";
import { Priority } from "../../utils/priorityEnum";
import { TicketStatus } from "../../utils/ticketStatusEnum";
import { TicketType } from "../../utils/ticketTypeEnum";
import {
  createTicket,
  deleteTicketById,
  getTicketById,
  updateTicketBacklog,
  updateTicketBranch,
  updateTicketDescription,
  updateTicketEnvironment,
  updateTicketName,
  updateTicketPriority,
  updateTicketStatus,
  updateTicketType,
} from "../ticketConroller";

let organization1Id: number;
let organization2Id: number;

let user1Id: number;
let user2Id: number;

let project1Id: number;
let project2Id: number;
let project3Id: number;

let backlog1Id: number;
let backlog2Id: number;

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

  const newBacklogs = await createBacklogs(
    backlogs.map((b) => ({ ...b, projectId: project1Id, creatorId: user1Id }))
  );

  backlog1Id = newBacklogs[0].backlogId;
  backlog2Id = newBacklogs[1].backlogId;
};
const clearSchemaInMemoryDB = async () => {
  await clearBacklogs();
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
it("creates a ticket successfully", async () => {
  const data = tickets
    .slice(0, 2)
    .map((t) => ({ ...t, backlogId: backlog1Id, creatorId: user1Id }));
  const newTicketIds: number[] = [];
  for (let t of data) {
    let newTicket = await createTicket(t);
    newTicketIds.push(newTicket!.ticketId);
  }
  let expectedTicket = await getTicketById(newTicketIds[0]);

  expect.assertions(10);
  expect(expectedTicket).toBeDefined();
  expect(expectedTicket?.backlogId).toEqual(data[0].backlogId);
  expect(expectedTicket?.creatorId).toEqual(data[0].creatorId);
  expect(expectedTicket?.name).toEqual(data[0].name);
  expect(expectedTicket?.description).toEqual(data[0].description);
  expect(expectedTicket?.type).toEqual(data[0].type);
  expect(expectedTicket?.status).toEqual(data[0].status);
  expect(expectedTicket?.priority).toEqual(data[0].priority);
  expect(expectedTicket?.environment).toEqual(data[0].environment);
  expect(expectedTicket?.branch).toEqual(data[0].branch);
});

it("fails to create ticket", async () => {
  await expect(
    createTicket({ ...tickets[0], backlogId: 0, creatorId: 0 })
  ).rejects.toThrow();
});

it("updates ticket's backlog successfully or returns null if backlog does not exist", async () => {
  const data = { ...tickets[0], backlogId: backlog1Id, creatorId: user1Id };
  let newTicket = await createTicket(data);

  let expectedTicket = await updateTicketBacklog(
    newTicket!.ticketId,
    backlog2Id
  );

  expect(expectedTicket).toBeDefined();
  expect(expectedTicket?.backlogId).toEqual(backlog2Id);
  await expect(updateTicketBacklog(0, 1)).rejects.toThrow();
  await expect(
    updateTicketBacklog(expectedTicket!.ticketId, 0)
  ).rejects.toThrow();

  expectedTicket = await updateTicketBacklog(newTicket!.ticketId, 334);

  expect(expectedTicket).toEqual(null);
});
it("updates ticket's name or thwows error if ticketId or name are not valid", async () => {
  const data = { ...tickets[0], backlogId: backlog1Id, creatorId: user1Id };
  let newTicket = await createTicket(data);

  let expectedTicket = await updateTicketName(newTicket!.ticketId, "new name");

  expect(expectedTicket).toBeDefined();
  expect(expectedTicket?.name).toEqual("new name");

  expectedTicket = await updateTicketName(6789, "new name");

  expect(expectedTicket).toEqual(null);

  await expect(updateTicketName(0, "")).rejects.toThrow();
});
it("updates ticket's type or throws error if ticket is not valid", async () => {
  const data = { ...tickets[0], backlogId: backlog1Id, creatorId: user1Id };
  let newTicket = await createTicket(data);

  expect(newTicket?.type).toEqual(TicketType.Defect);
  let expectedTicket = await updateTicketType(
    newTicket!.ticketId,
    TicketType.Task
  );

  expect(expectedTicket).toBeDefined();
  expect(expectedTicket?.type).toEqual(TicketType.Task);
  await expect(updateTicketType(0, TicketType.Task)).rejects.toThrow();
});
it("updates ticket's estimation date", async () => {});
it("updates ticket's completion date", async () => {});
it("updates ticket's description", async () => {
  const data = { ...tickets[0], backlogId: backlog1Id, creatorId: user1Id };
  let newTicket = await createTicket(data);

  expect(newTicket?.description).toEqual(newTicket?.description);
  let expectedTicket = await updateTicketDescription(
    newTicket!.ticketId,
    "new description"
  );

  expect(expectedTicket).toBeDefined();
  expect(expectedTicket?.description).toEqual("new description");
});
it("updates ticket's status", async () => {
  const data = { ...tickets[0], backlogId: backlog1Id, creatorId: user1Id };
  let newTicket = await createTicket(data);

  expect(newTicket?.status).toEqual(newTicket?.status);
  let expectedTicket = await updateTicketStatus(
    newTicket!.ticketId,
    TicketStatus.CodeReview
  );

  expect(expectedTicket).toBeDefined();
  expect(expectedTicket?.status).toEqual(TicketStatus.CodeReview);
});
it("updates ticket's priority", async () => {
  const data = { ...tickets[0], backlogId: backlog1Id, creatorId: user1Id };
  let newTicket = await createTicket(data);

  expect(newTicket?.priority).toEqual(newTicket?.priority);
  let expectedTicket = await updateTicketPriority(
    newTicket!.ticketId,
    Priority.Medium
  );

  expect(expectedTicket).toBeDefined();
  expect(expectedTicket?.priority).toEqual(Priority.Medium);
  expect(newTicket?.priority).not.toEqual(expectedTicket?.priority);
});
it("updates ticket's environment", async () => {
  const data = { ...tickets[0], backlogId: backlog1Id, creatorId: user1Id };
  let newTicket = await createTicket(data);

  expect(newTicket?.environment).toEqual(newTicket?.environment);
  let expectedTicket = await updateTicketEnvironment(
    newTicket!.ticketId,
    "new environment"
  );

  expect(expectedTicket).toBeDefined();
  expect(expectedTicket?.environment).toEqual("new environment");
  expect(newTicket?.environment).not.toEqual(expectedTicket?.environment);
});
it("updates ticket's branch", async () => {
  const data = { ...tickets[0], backlogId: backlog1Id, creatorId: user1Id };
  let newTicket = await createTicket(data);

  expect(newTicket?.branch).toEqual(newTicket?.branch);
  let expectedTicket = await updateTicketBranch(
    newTicket!.ticketId,
    "release 3.4.5"
  );

  expect(expectedTicket).toBeDefined();
  expect(expectedTicket?.branch).toEqual("release 3.4.5");
  expect(newTicket?.branch).not.toEqual(expectedTicket?.branch);
});

it("gets ticket by id", async () => {
  const data = { ...tickets[0], backlogId: backlog1Id, creatorId: user1Id };
  let newTicket = await createTicket(data);

  expect(newTicket).toBeDefined();
  let expectedTicket = await getTicketById(newTicket!.ticketId);
  expect(expectedTicket).toBeDefined();
  expect(expectedTicket?.backlogId).toEqual(newTicket?.backlogId);
  expect(expectedTicket?.description).toEqual(newTicket?.description);
  expect(expectedTicket?.name).toEqual(newTicket?.name);
  expect(expectedTicket?.creatorId).toEqual(newTicket?.creatorId);

  await expect(getTicketById(0)).rejects.toThrow();
});

it("gets tickets by backlog id", async () => {});

it("gets tickets by user id", async () => {});

it("gets tickets by project id", async () => {});

it("deletes a ticket successfully or fails if ticket doees not exist", async () => {
  const data = tickets
    .slice(0, 2)
    .map((t) => ({ ...t, backlogId: backlog1Id, creatorId: user1Id }));
  const newTicketIds: number[] = [];
  for (let t of data) {
    let newTicket = await createTicket(t);
    newTicketIds.push(newTicket!.ticketId);
  }
  let expectedTicket1 = await getTicketById(newTicketIds[0]);
  let expectedTicket2 = await getTicketById(newTicketIds[1]);

  expect(expectedTicket1).toBeDefined();
  expect(expectedTicket2).toBeDefined();

  let deleteResponse = await deleteTicketById(newTicketIds[0]);
  expect(deleteResponse?.ticketId).toEqual(newTicketIds[0]);

  expectedTicket1 = await getTicketById(newTicketIds[0]);
  expectedTicket2 = await getTicketById(newTicketIds[1]);

  expect(expectedTicket1).toEqual(null);
  expect(expectedTicket2).toBeDefined();

  let failedDeleteResponse = await deleteTicketById(7876);
  expect(failedDeleteResponse).toEqual(null);
});
