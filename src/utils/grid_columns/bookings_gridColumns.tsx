import {
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import moment from "moment";
import { Link } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Box } from "@mui/material";

export const bookingColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "duration",
    headerName: "Duration",
    flex: 1,
  },
  {
    field: "from",
    headerName: "From",
    flex: 1,
  },
  {
    field: "to",
    headerName: "To",
    flex: 1,
  },
  {
    field: "suburb",
    headerName: "Suburb",
    flex: 1,
  },
  {
    field: "action",
    headerName: "Action",
    type: "string",
    flex: 1,
    renderCell: (params: GridRenderCellParams) => (
      <Link
        to={`/admin/booking/${params.id}`}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <RemoveRedEyeIcon />
      </Link>
    ),
  },
];
