import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Box, Button } from "@mui/material";
import { deleteApplicant } from "../../api_calls/Admin/admin_applicants";

export const applicantColumns: GridColDef[] = [
  // { field: "id", headerName: "ID", flex: 1 },
  { field: "transmissionType", headerName: "Transmission Type", flex: 1 },
  {
    field: "firstName",
    headerName: "First Name",
    flex: 1,
  },
  {
    field: "lastName",
    headerName: "Last Name",
    flex: 1,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
  },
  {
    field: "phone",
    headerName: "Phone",
    flex: 1,
  },
];
