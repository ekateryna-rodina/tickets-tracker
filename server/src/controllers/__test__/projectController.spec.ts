import { sql } from "@databases/pg";
import { db } from "../..";
import { IProjectInput } from "../../contracts/project";
import { createProject, getProjectById } from "../projectController";
let organization1Id: number;
let organization2Id: number;

beforeEach(async () => {
  return await createOrganizationInMemoryDB();
});

afterEach(async () => {
  return await deleteAllOrganizationsInMemoryDB();
});

async function createOrganizationInMemoryDB() {
  const organizationData = [
    {
      name: "org",
      email: "any",
      logo: null,
    },
    {
      name: "org1",
      email: "any1",
      logo: null,
    },
  ];

  let organizations: {
    organization_id: number;
    email: string;
    name: string;
    created_at: any;
    logo: any;
  }[] = [];
  for (let organization of organizationData) {
    const newOrganizationResponse = await db.query(sql`
  SELECT * from insert_organization(${organization.name}::varchar, 
                                    ${organization.email}::varchar, 
                                    ${organization.logo}::bytea)
  `);
    organizations.push(newOrganizationResponse[0]);
  }
  organization1Id = organizations[0].organization_id;
  organization2Id = organizations[1].organization_id;
}

async function deleteAllOrganizationsInMemoryDB() {
  await db.query(sql`DELETE FROM organization;`);
}
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
  let expectedProject = await getProjectById(newProject?.projectId);
  expect.assertions(3);
  expect(expectedProject).toBeDefined();
  expect(expectedProject?.name).toEqual(projectData.name);
  expect(expectedProject?.organizationId).toEqual(organization1Id);
});

it("returns null on get project by id if project does not exist", async () => {
  let expectedProject = await getProjectById("77");
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

it("gets projects by user id", async () => {});

// it("fails to get projects by organization id", async () => {});

// it("fails to get projects by id", async () => {});

// it("fails to get projects by user id", async () => {});
