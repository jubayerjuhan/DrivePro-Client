import { Action } from "../actions/actionTypings";
import {
  CLEAR_ERROR,
  INSTRUCTOR_LOGIN_COMPLETE,
  INSTRUCTOR_LOGIN_ERROR,
  INSTRUCTOR_LOGIN_PENDING,
  LEARNER_LOGIN_COMPLETE,
  LEARNER_LOGIN_ERROR,
  LEARNER_LOGIN_PENDING,
  LEARNER_SIGN_UP_COMPLETE,
  LEARNER_SIGN_UP_ERROR,
  LEARNER_SIGN_UP_PENDING,
} from "./reduxNamings";

export const userReducer = (state = {}, action: Action) => {
  switch (action.type) {
    case LEARNER_LOGIN_PENDING:
      return {
        ...state,
        loading: true,
      };
    case INSTRUCTOR_LOGIN_PENDING:
      return {
        ...state,
        loading: true,
      };
    case LEARNER_SIGN_UP_PENDING:
      return {
        ...state,
        loading: true,
      };
    case LEARNER_LOGIN_COMPLETE:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };
    case INSTRUCTOR_LOGIN_COMPLETE:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };
    case LEARNER_SIGN_UP_COMPLETE:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };
    case LEARNER_LOGIN_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case INSTRUCTOR_LOGIN_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case LEARNER_SIGN_UP_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
