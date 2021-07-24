import { combineReducers } from "redux";
import { organizationsReducer } from "./organizations/models/organizationsReducer";

const rootReducer = combineReducers({
  organizations: organizationsReducer,
});

export default rootReducer;
