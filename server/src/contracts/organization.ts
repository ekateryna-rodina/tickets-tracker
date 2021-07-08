export interface IOrganizationInput {
  name: string;
  email: string;
  createdAt: string;
  logo?: string;
}

export interface IOrganization {
  organizationId: number;
  name: string;
  email: string;
  createdAt: string;
  logo?: string;
}
