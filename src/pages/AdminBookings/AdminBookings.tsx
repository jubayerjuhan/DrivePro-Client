import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "material-react-toastify";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { getAllBookingsAdmin } from "../../api_calls/Admin/admin_booking";
import AdminPageWrapper from "../../components/AdminPageWrapper/AdminPageWrapper";
import HelmetTitle from "../../components/HelmetTitle/HelmetTitle";
import { BookingTypeBack } from "../../typings/bookingsType";
import { bookingColumns } from "../../utils/grid_columns/bookings_gridColumns";

const AdminBookings = () => {
  const [bookings, setBookings] = useState<BookingTypeBack[]>([]);
  useEffect(() => {
    getDatas();
  }, []);

  const getDatas = async () => {
    const data = await getAllBookingsAdmin();
    if (!data.success) return toast.error(data.message);

    setBookings(data.bookings);
  };

  let rows: any = [];
  bookings.forEach((booking, key) => {
    const row = {
      ...booking,
      id: booking._id,
      from: moment(booking.time.from).format("MMM Do YYYY, h:mm a"),
      to: moment(booking.time.to).format("MMM Do YYYY, h:mm a"),
      suburb: booking.pickupDetails.suburb,
    };
    rows.push(row);
  });

  return (
    <AdminPageWrapper className={"dashbaord__content-wrapper"}>
      <HelmetTitle title={`Bookings List - Admin`} />

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <p className="title">Bookings</p>
      </Box>
      <DataGrid
        rows={rows}
        columns={bookingColumns}
        pageSize={10}
        disableSelectionOnClick
        sx={{ height: "80vh" }}
      />
    </AdminPageWrapper>
  );
};

export default AdminBookings;
