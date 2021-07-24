import { applyMiddleware, createStore, Store } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { AppActionTypes } from "./actionTypes";
import { default as reducer, default as rootReducer } from "./reducer";

export type AppState = ReturnType<typeof rootReducer>;
const middleware = applyMiddleware(
  thunk as ThunkMiddleware<AppState, AppActionTypes>
);

const store: Store<AppState> = createStore(reducer, middleware);
export default store;
