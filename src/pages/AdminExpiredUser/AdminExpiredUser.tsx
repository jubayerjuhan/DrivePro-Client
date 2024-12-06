import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import AdminPageWrapper from "../../components/AdminPageWrapper/AdminPageWrapper";
import { DataGrid } from "@mui/x-data-grid";
import { Instructor } from "../../typings/instructorTypings";
import { getAllExpiredInstructors } from "../../api_calls/Admin/admin_instructors";
import { toast } from "material-react-toastify";
import { instructorColumns } from "../../utils/grid_columns/instructors_gridColumns";
import { useNavigate } from "react-router-dom";
import HelmetTitle from "../../components/HelmetTitle/HelmetTitle";

const AdminExpiredInstructor = () => {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    getDatas();
  }, []);

  const getDatas = async () => {
    const data = await getAllExpiredInstructors();
    if (!data.success) return toast.error(data.message);

    setInstructors(data.instructors);
  };

  let rows: any = [];

  instructors.forEach((instructor, key) => {
    const row = {
      ...instructor,
      id: instructor._id,
    };
    rows.push(row);
  });

  return (
    <AdminPageWrapper className={"dashbaord__content-wrapper"}>
      <HelmetTitle title={`License Expired Instructors - Admin`} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p className="title">Expired Instructors</p>
      </Box>
      <DataGrid
        rows={rows}
        columns={instructorColumns}
        pageSize={10}
        disableSelectionOnClick
        sx={{ height: "80vh" }}
      />
    </AdminPageWrapper>
  );
};

export default AdminExpiredInstructor;
