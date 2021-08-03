import { BoardActionTypes, DRAG_LEAVE } from "./models/actions";

const initialState = {
  dragLeave: null,
};

export const boardReducer = (
  state = initialState,
  action: BoardActionTypes
) => {
  switch (action.type) {
    case DRAG_LEAVE:
      return {
        ...state,
        dragLeave: action.payload,
      };
    default:
      return state;
  }
};
