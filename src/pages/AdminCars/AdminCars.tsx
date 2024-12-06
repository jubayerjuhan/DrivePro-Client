import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "material-react-toastify";
import React, { useState, useEffect } from "react";
import { getAllCars } from "../../api_calls/Admin/admin_car";
import AdminAddItems from "../../components/AdminAddItems/AdminAddItems";
import AdminPageWrapper from "../../components/AdminPageWrapper/AdminPageWrapper";
import HelmetTitle from "../../components/HelmetTitle/HelmetTitle";
import { Car } from "../../typings/carTypings";
import { carColumns } from "../../utils/grid_columns/cars_gridColumns";

const AdminCars = () => {
  const [showModal, setShowModal] = useState(false);
  const [cars, setCars] = useState<Car[]>([]);
  useEffect(() => {
    getPageData();
  }, []);

  const getPageData = async () => {
    const data = await getAllCars();
    if (!data.success) return toast.error(data.message);
    setCars(data.cars);
  };

  const rows: Car[] = [];

  cars.forEach((car) => {
    car.id = car._id;
    rows.push(car);
  });

  return (
    <AdminPageWrapper className={"dashbaord__content-wrapper"}>
      <HelmetTitle title={`Cars List - Admin`} />

      <AdminAddItems type={"car"} open={showModal} handleOpen={setShowModal} />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <p className="title">Cars</p>
        <Button onClick={() => setShowModal(true)}>Add Car</Button>
      </Box>
      <DataGrid
        rows={rows}
        columns={carColumns}
        pageSize={10}
        disableSelectionOnClick
        sx={{ height: "80vh" }}
      />
    </AdminPageWrapper>
  );
};

export default AdminCars;
