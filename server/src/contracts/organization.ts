export interface IOrganizationInput {
  name: string;
  email: string;
  createdAt: string;
  logo?: string;
}

export interface IOrganizationInfo {
  organizationId: number;
  name: string;
  email: string;
  createdAt: string;
  logo?: string;
}
