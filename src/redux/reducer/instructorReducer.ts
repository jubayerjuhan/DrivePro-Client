import { Action } from "../actions/actionTypings";
import { DELETE_INSTRUCTOR, SET_INSTRUCTOR } from "./reduxNamings";

const initialState = {};

export const instructorReducer = (
  state = initialState,
  { type, payload }: Action
) => {
  switch (type) {
    case SET_INSTRUCTOR:
      return { ...state, instructor: payload };
    case DELETE_INSTRUCTOR:
      return { ...state, instructor: null };

    default:
      return state;
  }
};
