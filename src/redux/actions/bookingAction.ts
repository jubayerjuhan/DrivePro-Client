import { Dispatch } from "react";
import { client } from "../../client";
import {
  BOOKING_FAILED,
  BOOKING_PENDING,
  BOOKING_SUCCESS,
  CLEAR_ERROR,
  CLEAR_SUCCESS,
  PURCHASE_CREDIT_ERROR,
  PURCHASE_CREDIT_PENDING,
  PURCHASE_CREDIT_SUCCESS,
  SET_BOOKING,
} from "../reducer/reduxNamings";
import { Action } from "./actionTypings";

// book lesson
export const bookLesson =
  (bookingInfo: any) => async (dispatch: Dispatch<Action>) => {
    try {
      dispatch({ type: BOOKING_PENDING });
      const booking = await client.post("/add-booking", bookingInfo);
      console.log(booking, "booking...");
      dispatch({ type: BOOKING_SUCCESS });
      return true;
    } catch (error) {
      dispatch({ type: BOOKING_FAILED });
      return false;
    }
  };
//
export const setBookingInfo =
  (bookingInfo: any) => async (dispatch: Dispatch<Action>) => {
    dispatch({ type: SET_BOOKING, payload: bookingInfo });
    return true;
  };
//
export const setPickupDetails =
  (bookingInfo: any) => async (dispatch: Dispatch<Action>) => {
    dispatch({ type: SET_BOOKING, payload: bookingInfo });
  };

export const clearError = () => async (dispatch: Dispatch<Action>) => {
  dispatch({ type: CLEAR_ERROR });
};
export const clearSuccess = () => async (dispatch: Dispatch<Action>) => {
  dispatch({ type: CLEAR_SUCCESS });
};

// purchase credit============================
export const purchaseCredit =
  (hour: number) => async (dispatch: Dispatch<Action>) => {
    console.log(hour, "Booking Hour");
    try {
      dispatch({ type: PURCHASE_CREDIT_PENDING });

      const credit = await client.post("/add-credit", { hour });
      dispatch({ type: PURCHASE_CREDIT_SUCCESS });
    } catch (error: any) {
      dispatch({
        type: PURCHASE_CREDIT_ERROR,
        payload: error.response.data.message || error.message,
      });
    }
  };
