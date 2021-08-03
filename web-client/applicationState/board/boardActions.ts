import { Dispatch } from "redux";
import { AppState } from "../store";
import { DRAG_LEAVE } from "./models/actions";

export const dragLeave = (data: any) => ({
  type: DRAG_LEAVE,
  payload: data,
});

export function dragLeaveAction(data: any) {
  return (dispatch: Dispatch, state: AppState) => {
    dispatch(dragLeave(data));
  };
}
