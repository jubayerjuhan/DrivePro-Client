import {
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import moment from "moment";
import { Link } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Box } from "@mui/system";

export const userColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First name",
    flex: 1,
  },
  {
    field: "lastName",
    headerName: "Last name",
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
    type: "number",
    flex: 1,
  },
  {
    field: "createdAt",
    headerName: "Joined On",
    type: "string",
    flex: 1,
    valueGetter: (params: GridValueGetterParams) =>
      `${moment(params.row.createdAt)}`,
  },
  {
    field: "action",
    headerName: "Action",
    type: "string",
    flex: 1,
    renderCell: (params: GridRenderCellParams) => (
      <Link
        to={`/admin/user/${params.id}`}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <RemoveRedEyeIcon />
      </Link>
    ),
  },
];
