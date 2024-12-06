import IconButton from "../../components/core/Button/IconButton/IconButton";
import DescriptionIcon from "@mui/icons-material/Description";

const handleInvoiceClick = (url) => {
  window.open(url, "_blank");
};
export const financialReportingColumn = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "createdAt",
    headerName: "Date",
    width: 150,
  },
  {
    field: "bookingAmount",
    headerName: "Booking Amount",
    width: 150,
  },
  {
    field: "managementFee",
    headerName: "Management Fee",
    width: 150,
  },
  {
    field: "gst",
    headerName: "GST",
    width: 150,
  },
  {
    field: "total",
    headerName: "Total",
    width: 150,
  },
  {
    field: "subtotal",
    headerName: "Subtotal",
    width: 150,
  },
  {
    field: "invoice",
    headerName: "Invoice",
    width: 200,
    renderCell: (params) => {
      return <IconButton title="Invoice" Icon={DescriptionIcon} onClick={() => handleInvoiceClick(params.value)} />;
    },
  },
];
