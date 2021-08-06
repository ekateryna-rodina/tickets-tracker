export interface IOrganizationInput {
  name: string;
  email: string;
  logo?: Buffer | string;
}

export interface IOrganizationInfo {
  organizationId: number;
  createdAt: string;
}

export type Organization = IOrganizationInput & IOrganizationInfo;
