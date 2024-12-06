import { useEffect, useState } from "react";
import { EarningType } from "../../../typings/Earning/earning";
import AdminPageWrapper from "../../../components/AdminPageWrapper/AdminPageWrapper";
import { FetchInstructorEarningsTypings, fetchAllInstructorEarnings } from "../../../api_calls/Admin/admin_earnings";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import IconButton from "../../../components/core/Button/IconButton/IconButton";
import ReceiptIcon from "@mui/icons-material/Receipt";
import moment from "moment";

const InstructorEarnings = () => {
  const [earnings, setEarnings] = useState<EarningType[]>();
  console.log(earnings);
  useEffect(() => {
    getAndStoreInstructorEarnings();
  }, []);

  const getAndStoreInstructorEarnings = async () => {
    try {
      const result: FetchInstructorEarningsTypings = await fetchAllInstructorEarnings();
      if (result.success) setEarnings(result.earnings);
    } catch (err: any) {
      console.log(err?.message);
    }
  };

  //   show recipt on a diffrent window
  const handleReciptIconClick = (url: string) => {
    window.open(url, "_blank");
  };
  const dataGridColums: GridColDef[] = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "createdAt", headerName: "Date", width: 150 },
    { field: "instructor", headerName: "Instructor Name", width: 150 },
    { field: "learner", headerName: "Learner Name", width: 150 },
    {
      field: "paid",
      headerName: "Paid",
      width: 80,
      renderCell(params) {
        console.log(params.value);
        return <p style={{ color: params.value ? "#06cc21" : "#f58d05" }}>{params.value ? "Yes" : "No"}</p>;
      },
    },
    { field: "unitPrice", headerName: "Unit Price", width: 80 },
    { field: "duration", headerName: "duration", width: 80 },
    { field: "bookingPrice", headerName: "Booking Price", width: 100 },
    { field: "managementFee", headerName: "Management Fee", width: 80 },
    { field: "total", headerName: "Total", width: 80 },
    { field: "gst", headerName: "GST", width: 80 },
    { field: "subtotal", headerName: "Subtotal", width: 80 },
    {
      field: "invoice",
      headerName: "Invoice",
      width: 150,
      renderCell(params) {
        console.log(params.value);
        return <IconButton title="Invoice" Icon={ReceiptIcon} onClick={() => handleReciptIconClick(params.value)} />;
      },
    },
  ];

  const rows: any = [];

  earnings?.forEach((earning, key) => {
    rows.push({
      id: earning._id,
      createdAt: moment(earning.createdAt).format("DD MMMM YYYY"),
      instructor: earning.instructor?.firstName,
      learner: earning.learner?.firstName,
      paid: earning.paid,
      unitPrice: earning.unitPrice,
      duration: earning.duration,
      bookingPrice: earning.bookingAmount,
      total: earning.total,
      gst: earning.gst,
      managementFee: earning.managementFee,
      subtotal: earning.subtotal,
      invoice: earning.invoice,
    });
  });

  return (
    <AdminPageWrapper>
      <DataGrid sx={{ minHeight: "80vh" }} rows={rows} columns={dataGridColums} disableSelectionOnClick />
    </AdminPageWrapper>
  );
};

export default InstructorEarnings;
