import { applyMiddleware, createStore, Store } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import reducer from "../applicationState/reducer";
import { AppActionTypes } from "./actionTypes";
import rootReducer from "./reducer";

export type AppState = ReturnType<typeof rootReducer>;
const middleware = applyMiddleware(
  thunk as ThunkMiddleware<AppState, AppActionTypes>
);

const store: Store<AppState> = createStore(reducer, middleware);
export default store;
