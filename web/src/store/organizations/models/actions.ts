export const CREATE_ORGANIZATION = "CREATE_ORGANIZATION";

export interface ICreateOrganizationAction {
  type: typeof CREATE_ORGANIZATION;
  payload: {};
}

export type OrganizationsActionTypes = ICreateOrganizationAction;
