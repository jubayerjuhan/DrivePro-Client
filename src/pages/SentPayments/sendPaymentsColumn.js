import ReceiptIcon from "@mui/icons-material/Receipt";
import IconButton from "../../components/core/Button/IconButton/IconButton";

const handleReciptIconClick = (url) => {
  window.open(url, "_blank");
};

const columns = [
  { field: "id", headerName: "ID", width: 200 },
  {
    field: "instructorName",
    headerName: "Instructor Name",
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
    field: "total",
    headerName: "Total",
    width: 150,
  },
  {
    field: "gst",
    headerName: "GST",
    width: 150,
  },
  {
    field: "subtotal",
    headerName: "Subtotal",
    width: 150,
  },
  {
    field: "bsbNumber",
    headerName: "Instructor BSB",
    width: 150,
  },
  {
    field: "invoice",
    headerName: "Invoice",
    type: "string",
    width: 150,
    renderCell(params) {
      return (
        <IconButton
          title="Invoice"
          Icon={ReceiptIcon}
          onClick={() => handleReciptIconClick(params.value)}
        />
      );
    },
  },
];

export default columns;
