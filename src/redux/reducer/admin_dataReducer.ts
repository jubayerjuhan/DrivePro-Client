import { Action } from "../actions/actionTypings";
import {
  ADMIN_BOOKINGS_ERROR,
  ADMIN_BOOKINGS_PENDING,
  ADMIN_BOOKINGS_SUCCESS,
  ADMIN_INSTRUCTORS_ERROR,
  ADMIN_INSTRUCTORS_PENDING,
  ADMIN_INSTRUCTORS_SUCCESS,
  ADMIN_USERS_ERROR,
  ADMIN_USERS_PENDING,
  ADMIN_USERS_SUCCESS,
  CLEAR_ERROR,
  CLEAR_SUCCESS,
} from "./reduxNamings";

export const adminDataReducer = (
  state = {
    users: [],
    instructors: [],
    bookings: [],
  },
  action: Action
) => {
  switch (action.type) {
    case ADMIN_USERS_PENDING:
      return {
        ...state,
        users: {
          ...state?.users,
          loading: true,
        },
      };
    case ADMIN_USERS_SUCCESS:
      return {
        ...state,

        users: {
          ...state?.users,
          loading: false,
          users: action.payload,
          success: true,
        },
      };
    case ADMIN_USERS_ERROR:
      return {
        ...state,

        users: {
          ...state?.users,
          loading: false,
          error: action.payload,
        },
      };
    case ADMIN_BOOKINGS_PENDING:
      return {
        ...state,

        bookings: {
          ...state?.bookings,
          loading: true,
        },
      };
    case ADMIN_BOOKINGS_SUCCESS:
      return {
        ...state,

        bookings: {
          ...state?.bookings,
          loading: false,
          bookings: action.payload,
          success: true,
        },
      };
    case ADMIN_BOOKINGS_ERROR:
      return {
        ...state,

        bookings: {
          ...state?.bookings,
          loading: false,
          error: action.payload,
        },
      };

    case ADMIN_INSTRUCTORS_PENDING:
      return {
        ...state,

        instructors: {
          ...state?.instructors,
          loading: true,
        },
      };
    case ADMIN_INSTRUCTORS_SUCCESS:
      return {
        ...state,

        instructors: {
          ...state?.instructors,
          loading: false,
          instructors: action.payload,
          success: true,
        },
      };
    case ADMIN_INSTRUCTORS_ERROR:
      return {
        ...state,

        instructors: {
          ...state?.instructors,
          loading: false,
          error: action.payload,
        },
      };
    case CLEAR_ERROR:
      return {
        ...state,

        instructors: {
          ...state.instructors,
          error: null,
        },
        bookings: {
          ...state.bookings,
          error: null,
        },
        users: {
          ...state.users,
          error: null,
        },
      };
    case CLEAR_SUCCESS:
      return {
        ...state,
        instructors: {
          ...state.instructors,
          success: null,
        },
        bookings: {
          ...state.bookings,
          success: null,
        },
        users: {
          ...state.users,
          success: null,
        },
      };
    default:
      return state;
  }
};
