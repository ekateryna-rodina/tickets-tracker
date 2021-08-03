export const DRAG_LEAVE = "DRAG_LEAVE";

export interface IDragLeaveAction {
  type: typeof DRAG_LEAVE;
  payload: {};
}

export type BoardActionTypes = IDragLeaveAction;
