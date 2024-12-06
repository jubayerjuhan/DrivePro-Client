import { Action } from "../actions/actionTypings";
import {
  GET_SUBURBS_ERROR,
  GET_SUBURBS_PENDING,
  GET_SUBURBS_SUCCESS,
  SET_SUBURBS,
} from "./reduxNamings";

export const suburbReducer = (state = {}, action: Action) => {
  switch (action.type) {
    case SET_SUBURBS:
      return {
        ...state,
        suburb: action.payload,
      };

    default:
      return state;
  }
};
export const adminSuburbs = (state = {}, action: Action) => {
  switch (action.type) {
    case GET_SUBURBS_PENDING:
      return {
        ...state,
        loading: true,
      };
    case GET_SUBURBS_SUCCESS:
      return {
        ...state,
        loading: false,
        suburbs: action.payload,
      };
    case GET_SUBURBS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};
