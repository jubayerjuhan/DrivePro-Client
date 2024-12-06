import { Button } from "@mui/material";
import { Box } from "@mui/system";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridRenderCellParams,
  GridRowId,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../api_calls/admin_api";

import AdminPageWrapper from "../../components/AdminPageWrapper/AdminPageWrapper";
import { State, User } from "../../typings/reduxTypings";
import "./dashboardListPage.scss";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AdminListEdit from "../../components/AdminListEdit/AdminListEdit";
import { userColumns } from "../../utils/grid_columns/user_gridColumns";
import HelmetTitle from "../../components/HelmetTitle/HelmetTitle";

const AdminUsers = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<GridRowId>();

  // actual code starts here
  const { users, loading } = useSelector(
    (state: State) => state.adminData.users
  );

  const rows: User[] = [];
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  if (users) {
    users.forEach((user) => {
      user.id = user._id;
      rows.push(user);
    });
  }

  return (
    <>
      <HelmetTitle title={`Users List - Admin`} />

      {/* <AdminListEdit /> */}
      <AdminPageWrapper className={"dashbaord__content-wrapper"}>
        <Box>
          <p className="title">Users</p>
        </Box>
        <DataGrid
          rows={rows}
          columns={userColumns}
          pageSize={10}
          disableSelectionOnClick
          sx={{ height: "80vh" }}
        />
      </AdminPageWrapper>
    </>
  );
};

export default AdminUsers;
