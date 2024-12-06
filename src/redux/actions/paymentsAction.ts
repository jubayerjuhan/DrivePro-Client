import { Dispatch } from "redux";
import { GridSelectionModel } from "@mui/x-data-grid";
import { admin } from "../../client";
import {
  PROMISE_REJECTED,
  PROMISE_RESOLVED,
  PROMISE_SENT,
} from "../reducer/reduxNamings";

interface PayInstructorsResponse {
  data: { success: boolean; message: string };
}

export const paySelectedInstructors =
  (selectedInstructors: GridSelectionModel) =>
  async (dispatch: Dispatch<any>) => {
    console.log("object");
    try {
      dispatch({ type: PROMISE_SENT });
      const { data }: PayInstructorsResponse = await admin.post(
        "earning/pay-selected-instructors",
        {
          instructors: selectedInstructors,
        }
      );
      console.log(data.message, data, "result message");
      dispatch({ type: PROMISE_RESOLVED, payload: data.message });
    } catch (err) {
      dispatch({
        type: PROMISE_REJECTED,
        payload: "Can't Send Payment To Instructors",
      });
    }
  };
