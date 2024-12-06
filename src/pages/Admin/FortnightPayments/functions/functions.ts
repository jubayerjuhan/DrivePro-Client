import { GridSelectionModel } from "@mui/x-data-grid";
import { toast } from "material-react-toastify";
import React from "react";
import { DESTROY_PROMISE } from "../../../../redux/reducer/reduxNamings";

export const handleSelectInstructorForPayment = (
  selectedIds: GridSelectionModel,
  setSelectedInstructor: React.Dispatch<
    React.SetStateAction<GridSelectionModel | undefined>
  >
) => {
  setSelectedInstructor(selectedIds);
};

export const redirectToInstructorProfile = (id: string): void => {
  window.open(`instructor/${id}`, "_blank");
};

export const showSnackAfterPaymentAction = (
  error: string | undefined,
  success: boolean | undefined,
  message: string | undefined,
  dispatch: any
) => {
  if (error) toast.error(error);
  if (success) toast.success(message);
  dispatch({ type: DESTROY_PROMISE });
};
