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

export const carColumns: GridColDef[] = [
  {
    field: "image",
    headerName: "Image",
    type: "string",
    flex: 1,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <Box>
          <img
            src={params.formattedValue}
            alt=""
            style={{ height: "100px", objectFit: "contain" }}
          />
        </Box>
      );
    },
  },
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "Name",
    flex: 1,
  },

  {
    field: "action",
    headerName: "Action",
    type: "string",
    flex: 1,
    renderCell: (params: GridRenderCellParams) => (
      <Link
        to={`/admin/car/${params.id}`}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <RemoveRedEyeIcon />
      </Link>
    ),
  },
];
