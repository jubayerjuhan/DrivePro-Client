import { Dispatch } from "redux";
import { admin, client } from "../client";
import { Action } from "../redux/actions/actionTypings";
import {
  ADMIN_BOOKINGS_ERROR,
  ADMIN_BOOKINGS_PENDING,
  ADMIN_BOOKINGS_SUCCESS,
  ADMIN_INSTRUCTORS_ERROR,
  ADMIN_INSTRUCTORS_PENDING,
  ADMIN_INSTRUCTORS_SUCCESS,
  ADMIN_LOGIN_COMPLETE,
  ADMIN_LOGIN_ERROR,
  ADMIN_LOGIN_PENDING,
  ADMIN_USERS_ERROR,
  ADMIN_USERS_PENDING,
  ADMIN_USERS_SUCCESS,
  GET_SUBURBS_ERROR,
  GET_SUBURBS_PENDING,
  GET_SUBURBS_SUCCESS,
} from "../redux/reducer/reduxNamings";
import { storeAtLocalStorage } from "../utils/localstorage";

export const adminLogin = (cred: any) => async (dispatch: Dispatch<Action>) => {
  try {
    dispatch({ type: ADMIN_LOGIN_PENDING });

    const { data } = await client.post("/admin/login", cred);

    storeAtLocalStorage("adminJwtToken", data.jwtToken);
    dispatch({ type: ADMIN_LOGIN_COMPLETE, payload: data.user });
  } catch (error: any) {
    dispatch({
      type: ADMIN_LOGIN_ERROR,
      payload: error.response.data.message,
    });
  }
};

export const getAllUsers = () => async (dispatch: Dispatch<Action>) => {
  try {
    dispatch({ type: ADMIN_USERS_PENDING });

    const { data } = await admin.get("/all-users");
    dispatch({ type: ADMIN_USERS_SUCCESS, payload: data.users });
  } catch (error: any) {
    dispatch({ type: ADMIN_USERS_ERROR, payload: error.response.data.message });
  }
};
export const getAllInstructors = () => async (dispatch: Dispatch<Action>) => {
  try {
    dispatch({ type: ADMIN_INSTRUCTORS_PENDING });

    const { data } = await admin.get("/all-instructors");
    dispatch({ type: ADMIN_INSTRUCTORS_SUCCESS, payload: data.instructors });
  } catch (error: any) {
    dispatch({
      type: ADMIN_INSTRUCTORS_ERROR,
      payload: error.response.data.message,
    });
  }
};

export const getAllBookings = () => async (dispatch: Dispatch<Action>) => {
  try {
    dispatch({ type: ADMIN_BOOKINGS_PENDING });

    const { data } = await admin.get("/all-bookings");
    dispatch({ type: ADMIN_BOOKINGS_SUCCESS, payload: data.bookings });
  } catch (error: any) {
    dispatch({
      type: ADMIN_BOOKINGS_ERROR,
      payload: error.response.data.message,
    });
  }
};
export const getAllSuburbs = () => async (dispatch: Dispatch<Action>) => {
  try {
    dispatch({ type: GET_SUBURBS_PENDING });
    const { data } = await client.get("/suburbs");
    dispatch({ type: GET_SUBURBS_SUCCESS, payload: data.suburbs });
  } catch (error: any) {
    dispatch({
      type: GET_SUBURBS_ERROR,
      payload: error.response.data.message,
    });
  }
};

export const setPriceAdmin = async (price: any) => {
  try {
    const { data } = await admin.post("/set-price", price);
    return data;
  } catch (error) {
    return error;
  }
};
