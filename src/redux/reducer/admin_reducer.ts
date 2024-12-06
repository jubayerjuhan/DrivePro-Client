import { Action } from "../actions/actionTypings";
import {
  ADMIN_LOGIN_COMPLETE,
  ADMIN_LOGIN_ERROR,
  ADMIN_LOGIN_PENDING,
  ADMIN_LOGOUT,
  CLEAR_ERROR,
  CLEAR_SUCCESS,
} from "./reduxNamings";

export const adminReducer = (state = {}, action: Action) => {
  switch (action.type) {
    case ADMIN_LOGIN_PENDING:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_LOGOUT:
      return {
        ...state,
        admin: null,
      };
    case ADMIN_LOGIN_COMPLETE:
      return {
        ...state,
        loading: false,
        success: true,
        admin: action.payload,
      };
    case ADMIN_LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    case CLEAR_SUCCESS:
      return {
        ...state,
        success: null,
      };

    default:
      return state;
  }
};
