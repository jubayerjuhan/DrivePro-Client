import { Dispatch } from "redux";
import { client } from "../../client";
import { storeAtLocalStorage } from "../../utils/localstorage";
import {
  LEARNER_LOGIN_COMPLETE,
  LEARNER_LOGIN_ERROR,
  LEARNER_LOGIN_PENDING,
  LEARNER_SIGN_UP_COMPLETE,
  LEARNER_SIGN_UP_ERROR,
  LEARNER_SIGN_UP_PENDING,
} from "../reducer/reduxNamings";
import {
  Action,
  LearnerLoginCredentials,
  LearnerRegisterCredentials,
} from "./actionTypings";

export const registerLearner =
  (registerCredentials: LearnerRegisterCredentials) =>
  async (dispatch: Dispatch<Action>) => {
    const regCreds = {
      ...registerCredentials,
      dateOfBirth: new Date(registerCredentials.dateOfBirth),
    };

    try {
      dispatch({ type: LEARNER_SIGN_UP_PENDING, payload: "" });

      const { data } = await client.post("/register", regCreds);
      console.log(data);

      dispatch({ type: LEARNER_SIGN_UP_COMPLETE, payload: data.user });
      storeAtLocalStorage("jwtToken", data.jwtToken);
      return true;
    } catch (error: any) {
      dispatch({
        type: LEARNER_SIGN_UP_ERROR,
        payload: error.response.data.message
          ? error.response.data.message
          : "Unknown Error",
      });

      return false;
    }
  };
export const loginLearner =
  (loginCredentials: LearnerLoginCredentials) =>
  async (dispatch: Dispatch<Action>) => {
    try {
      dispatch({ type: LEARNER_LOGIN_PENDING, payload: "" });

      const { data } = await client.post("/login", loginCredentials);
      console.log(data);

      dispatch({ type: LEARNER_LOGIN_COMPLETE, payload: data.user });
      storeAtLocalStorage("jwtToken", data.jwtToken);

      return true;
    } catch (error: any) {
      dispatch({
        type: LEARNER_LOGIN_ERROR,
        payload: error.response.data.message
          ? error.response.data.message
          : "Unknown Error",
      });

      return false;
    }
  };
