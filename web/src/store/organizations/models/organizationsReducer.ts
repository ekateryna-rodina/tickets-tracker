import { CREATE_ORGANIZATION, OrganizationsActionTypes } from "./actions";

const initialState = {
  organizations: {},
};

export const organizationsReducer = (
  state = initialState,
  action: OrganizationsActionTypes
) => {
  switch (action.type) {
    case CREATE_ORGANIZATION:
      let newOrganization = action.payload;
      const newState = {
        organizations: { ...state.organizations, newOrganization },
      };
      return newState;
    default:
      return state;
  }
};
