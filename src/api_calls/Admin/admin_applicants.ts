import { GridRowId } from "@mui/x-data-grid";
import { admin } from "../../client";

export const getAppliedInstructors = async () => {
  try {
    const { data } = await admin.get(`/applied-instructors`);
    return data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response.data.message,
    };
  }
};

export const deleteApplicant = async (id: GridRowId) => {
  try {
    const { data } = await admin.delete(`remove-application/${id}`);
    return data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response.data.message,
    };
  }
};
