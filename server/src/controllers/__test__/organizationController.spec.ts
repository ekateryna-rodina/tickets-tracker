import { IOrganizationInput } from "../../../../common/contracts/organization";
import {
  createOrganization,
  getOrganizationById,
} from "../organizationController";
let organization: IOrganizationInput = {
  email: "any@any.any",
  name: "my organization",
};
it("throws an exeption on create organization if email or name are not provided", async () => {
  // act/expect
  expect.assertions(2);
  await expect(
    createOrganization({ ...organization, email: "" })
  ).rejects.toThrow("Name and email are required");
  await expect(
    createOrganization({ ...organization, name: "" })
  ).rejects.toThrow("Name and email are required");
});
it("creates new organization", async () => {
  // arrange
  let organization: IOrganizationInput = {
    name: "wonderful organization",
    email: "wonderful@wonderful.com",
  };
  //   act
  let newOrganization = await createOrganization(organization);
  let expectedOrganization = await getOrganizationById(
    +newOrganization!.organizationId
  );

  //   assert
  expect.assertions(4);
  expect(expectedOrganization).toBeDefined();
  expect(expectedOrganization?.name).toEqual(organization.name);
  expect(expectedOrganization?.email).toEqual(organization.email);
  expect(expectedOrganization?.createdAt).toBeDefined();
});
