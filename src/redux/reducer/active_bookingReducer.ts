import { Action } from "../actions/actionTypings";
import { DELETE_ACTIVE_BOOKING, SET_ACTIVE_BOOKING } from "./reduxNamings";

export const activeBooking = (state = {}, { payload, type }: Action) => {
  switch (type) {
    case SET_ACTIVE_BOOKING:
      return { ...state, booking: payload };
    case DELETE_ACTIVE_BOOKING:
      return { ...state, booking: null };

    default:
      return state;
  }
};
