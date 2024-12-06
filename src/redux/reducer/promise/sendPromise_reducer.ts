import { Action } from "../../actions/actionTypings";
import {
  DESTROY_PROMISE,
  PROMISE_REJECTED,
  PROMISE_RESOLVED,
  PROMISE_SENT,
} from "../reduxNamings";

export const sendPromiseReducer = (state = {}, action: Action) => {
  switch (action.type) {
    case PROMISE_SENT:
      return {
        ...state,
        loading: true,
      };
    case PROMISE_RESOLVED:
      return {
        ...state,
        message: action.payload,
        success: true,
        loading: false,
      };
    case PROMISE_REJECTED:
      return {
        ...state,
        success: false,
        loading: false,
        error: action.payload,
      };
    case DESTROY_PROMISE:
      return {};

    default:
      return state;
  }
};
