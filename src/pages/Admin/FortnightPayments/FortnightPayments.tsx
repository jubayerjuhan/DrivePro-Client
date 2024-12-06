import React, { useEffect, useState } from "react";
import AdminPageWrapper from "../../../components/AdminPageWrapper/AdminPageWrapper";
import { DataGrid, GridColDef, GridSelectionModel } from "@mui/x-data-grid";

import {
  GetInstructorPaymentListType,
  UnpaidInstructorType,
  getInstructorPaymentList,
} from "../../../api_calls/Admin/admin_payments";
import {
  handleSelectInstructorForPayment,
  redirectToInstructorProfile,
  showSnackAfterPaymentAction,
} from "./functions/functions";

// icons
import PaidIcon from "@mui/icons-material/Paid";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import IconButton from "../../../components/core/Button/IconButton/IconButton";

// scss
import "./fortnightPayments.scss";
import { paySelectedInstructors } from "../../../redux/actions/paymentsAction";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../../typings/reduxTypings";

const FortnightPayments = () => {
  const dispatch: any = useDispatch();
  // redux global state value -> Send Promise
  const { loading, error, success, message } = useSelector(
    (state: State) => state.sendPromise
  );

  // dealing the success and error after sending the req on server
  if (error || success) {
    showSnackAfterPaymentAction(error, success, message, dispatch);
  }

  // selected and unpaid list state
  const [selectedInstructors, setSelectedInstructors] =
    useState<GridSelectionModel>();
  const [unpaidInstructorList, setUnpaidInstructorList] =
    useState<UnpaidInstructorType[]>();

  useEffect(() => {
    fetchAndStoreInstructorList();
  }, [success]);

  // fetching the list from backend
  const fetchAndStoreInstructorList = async () => {
    const result: GetInstructorPaymentListType =
      await getInstructorPaymentList();
    if (result.success) setUnpaidInstructorList(result.instructors);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "firstName", headerName: "First Name", width: 150 },
    { field: "lastName", headerName: "Last Name", width: 150 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "amount", headerName: "Amount", width: 150 },
    {
      field: "profile",
      headerName: "Instructor Profile",
      width: 250,
      renderCell(params) {
        return (
          <IconButton
            title={"Profile"}
            Icon={AccountCircleIcon}
            onClick={() => redirectToInstructorProfile(params.row?.id)}
          />
        );
      },
    },
  ];

  const rows: any = [];

  unpaidInstructorList?.forEach((instructor, key) => {
    rows.push({
      id: instructor._id,
      firstName: instructor.firstName,
      lastName: instructor.lastName,
      email: instructor.email,
      amount: instructor.amount,
    });
  });

  return (
    <AdminPageWrapper>
      <h5>Fortnightly Payment</h5>
      <p>Send Fortnigly Payment Reports To Instructors From Here</p>
      <div className="instructor_pay-btn">
        {typeof selectedInstructors !== "undefined" &&
          selectedInstructors?.length > 0 && (
            <IconButton
              title="Pay Selected Instructors"
              Icon={PaidIcon}
              loading={loading}
              onClick={() =>
                dispatch(paySelectedInstructors(selectedInstructors))
              }
            />
          )}
      </div>
      <DataGrid
        sx={{ minHeight: "80vh" }}
        rows={rows}
        columns={columns}
        disableSelectionOnClick
        checkboxSelection
        onSelectionModelChange={(selections: GridSelectionModel) =>
          handleSelectInstructorForPayment(selections, setSelectedInstructors)
        }
      />
    </AdminPageWrapper>
  );
};

export default FortnightPayments;
