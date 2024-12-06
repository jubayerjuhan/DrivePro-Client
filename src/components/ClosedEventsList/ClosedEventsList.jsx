import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { client } from "../../client";
import Button from "../core/Button/Button";
import { toast } from "material-react-toastify";
import moment from "moment";

export default function ClosedEventsList() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetchClosedEvents();
  }, []);

  const fetchClosedEvents = async () => {
    try {
      const { data } = await client.get("/instructor/closed-event/list");
      const processedRows = data.closedEvents.map((event, index) => ({
        ...event,
        id: index + 1,
        startTime: moment(event.startTime).format("DD-MM-YYYY HH:mm a"),
        endTime: moment(event.endTime).format("DD-MM-YYYY HH:mm a"),
        _id: event._id, // Assign a unique id to each row
      }));
      setRows(processedRows);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "eventName", headerName: "Event Name", width: 250, editable: true },
    { field: "startTime", headerName: "Start Time", width: 250 },
    { field: "endTime", headerName: "End Time", width: 250 },
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => <Button title={"Delete Event"} onClick={() => deleteEvent(params.row._id)} />,
    },
  ];

  const deleteEvent = async (id) => {
    const concent = window.confirm("Delete The Closed Event?");
    if (!concent) return;
    const { data } = await client.delete(`instructor/closed-event/${id}`);
    if (!data.success) toast.error("Couldn't Delete Event");
    toast.success("Event Deleted");
    fetchClosedEvents();
  };

  return (
    <Box sx={{ height: "85vh", width: "100%" }}>
      <DataGrid rows={rows} columns={columns} />
    </Box>
  );
}
