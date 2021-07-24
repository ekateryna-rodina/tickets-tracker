import { Dispatch } from "redux";
import { AppState } from "../store";
import { CREATE_ORGANIZATION } from "./models/actions";

export const createOrganization = (organization: {}) => ({
  type: CREATE_ORGANIZATION,
  payload: organization,
});

export function createOrganizationAction(organization: {}) {
  return (dispatch: Dispatch, state: AppState) => {
    dispatch(createOrganization(organization));
  };
}
