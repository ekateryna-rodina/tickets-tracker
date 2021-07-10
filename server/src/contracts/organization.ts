export interface IOrganizationInput {
  name: string;
  email: string;
  logo?: Buffer | string;
}

export interface IOrganizationInfo {
  organizationId: number;
  name: string;
  email: string;
  createdAt: string;
  logo?: Buffer | string | undefined;
}
