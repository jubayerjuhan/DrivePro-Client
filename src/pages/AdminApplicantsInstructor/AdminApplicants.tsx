import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import { toast } from "material-react-toastify";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  deleteApplicant,
  getAppliedInstructors,
} from "../../api_calls/Admin/admin_applicants";

import AdminPageWrapper from "../../components/AdminPageWrapper/AdminPageWrapper";
import HelmetTitle from "../../components/HelmetTitle/HelmetTitle";
import { BookingTypeBack } from "../../typings/bookingsType";
import { applicantColumns } from "../../utils/grid_columns/applicants_gridColumns";

const AdminApplicants = () => {
  const [applicants, setApplicants] = useState<BookingTypeBack[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getDatas();
  }, [loading]);

  const getDatas = async () => {
    const data = await getAppliedInstructors();
    if (!data.success) return toast.error(data.message);

    setApplicants(data.applicants);
  };

  let rows: any = [];
  applicants.forEach((applicant, key) => {
    const row = {
      ...applicant,
      id: applicant._id,
    };
    rows.push(row);
  });

  // action buttons
  const actionButtons = {
    field: "action",
    headerName: "Action",
    type: "string",
    flex: 1,
    renderCell: (params: GridRenderCellParams) => (
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <Link
          to={`/admin/application/${params.id}`}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <RemoveRedEyeIcon />
        </Link>
        <Button
          title="Delete"
          onClick={async () => {
            setLoading(true);
            await deleteApplicant(params.id);
            setLoading(false);
          }}
        >
          Delete
        </Button>
      </Box>
    ),
  };

  return (
    <AdminPageWrapper className={"dashbaord__content-wrapper"}>
      <HelmetTitle title={`Instructor Applicants - Admin`} />

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <p className="title">Instructor Applicants</p>
      </Box>
      <DataGrid
        rows={rows}
        columns={[...applicantColumns, actionButtons]}
        pageSize={10}
        disableSelectionOnClick
        sx={{ height: "80vh" }}
      />
    </AdminPageWrapper>
  );
};

export default AdminApplicants;
