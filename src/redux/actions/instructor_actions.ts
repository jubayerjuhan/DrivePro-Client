import { Dispatch } from "react";
import { client } from "../../client";
import { storeAtLocalStorage } from "../../utils/localstorage";
import {
  INSTRUCTOR_LOGIN_COMPLETE,
  INSTRUCTOR_LOGIN_ERROR,
  INSTRUCTOR_LOGIN_PENDING,
} from "../reducer/reduxNamings";
import { Action, LearnerLoginCredentials } from "./actionTypings";

export const loginInstructor =
  (loginCredentials: LearnerLoginCredentials) =>
  async (dispatch: Dispatch<Action>) => {
    try {
      dispatch({ type: INSTRUCTOR_LOGIN_PENDING, payload: "" });

      const { data } = await client.post("/login-instructor", loginCredentials);
      console.log(data);

      dispatch({ type: INSTRUCTOR_LOGIN_COMPLETE, payload: data.user });
      storeAtLocalStorage("jwtToken", data.jwtToken);

      return true;
    } catch (error: any) {
      console.log(error);
      dispatch({
        type: INSTRUCTOR_LOGIN_ERROR,
        payload: error.response.data.message
          ? error.response.data.message
          : "Unknown Error",
      });

      return false;
    }
  };
