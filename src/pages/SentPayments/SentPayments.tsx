import { useEffect, useState } from "react";

// api functions and typings
import {
  AdminGetAllFortnightlyPaymentsReturn,
  adminGetAllFortnightlyPayments,
} from "../../api_calls/Admin/admin_fortnightly_payments";

// Components
import IconButton from "../../components/core/Button/IconButton/IconButton";
import AdminPageWrapper from "../../components/AdminPageWrapper/AdminPageWrapper";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { toast } from "material-react-toastify";

// icon import
import ReceiptIcon from "@mui/icons-material/Receipt";
// typings
import { FortnightlyPayment } from "../../typings/FortnightlyPayments/fortnightlyPayment";
// styles
import "./SentPayments.scss";
import sentPaymentsColumns from "./sendPaymentsColumn";

const SentPayments = () => {
  // state to store all fortnightly payments after fetching
  const [fortnightlyPayments, setFortnightlyPayments] =
    useState<FortnightlyPayment[]>();

  useEffect(() => {
    getAllSentFortnightPayments();
  }, []);

  const getAllSentFortnightPayments = async () => {
    try {
      // calling the api to get all sent payments
      const data: AdminGetAllFortnightlyPaymentsReturn =
        await adminGetAllFortnightlyPayments();
      // if the data is success then setting all Payments to the state
      if (data.success) setFortnightlyPayments(data.fortnightlyPayments);
    } catch (error: any) {
      // showing the error message as toast
      toast.error(error?.message);
    }
  };

  const rows: any = [];
  fortnightlyPayments?.forEach((payment) => {
    rows.push({
      ...payment,
      instructorName: `${
        payment.instructor.firstName + " " + payment.instructor.lastName
      }`,
      bsbNumber: payment.instructor.bsbNumber,
      id: payment._id,
    });
  });
  return (
    <AdminPageWrapper>
      <div className="sent__payments-header">
        <h5>Sent Payments</h5>
      </div>
      <DataGrid
        rows={rows}
        columns={sentPaymentsColumns}
        sx={{ height: "80vh" }}
      />
    </AdminPageWrapper>
  );
};

export default SentPayments;
