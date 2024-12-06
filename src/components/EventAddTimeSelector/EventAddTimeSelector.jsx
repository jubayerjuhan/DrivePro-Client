import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import Button from "../core/Button/Button";
import { TextField } from "@mui/material";
import dayjs from "dayjs";
import { addClosedEvent } from "../../api_calls/event_api";
import { toast } from "material-react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  width: "350px",
  p: 3,
  borderRadius: 2,
};

export default function EventAddTimeSelector({ open, setOpen, getBookings, fetchInstructor }) {
  console.log(open, setOpen, "lala");
  const [event, setEvent] = React.useState({});

  const handleDateChange = (fieldName, e) => {
    setEvent({ ...event, [fieldName]: dayjs(e) });
  };

  const saveEvent = async () => {
    try {
      const message = await addClosedEvent(event);
      toast.success(message);
      await getBookings();
      await fetchInstructor();
      setOpen(false);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TextField
              id="outlined-basic"
              label="Event Name"
              variant="outlined"
              onChange={(e) => setEvent({ ...event, eventName: e.target.value })}
            />
            <DemoItem label="Start Time">
              <MobileDateTimePicker onChange={(e) => handleDateChange("startTime", e)} format="DD-MM-YYYY HH:mm a" />
            </DemoItem>
            <DemoItem label="End Time">
              <MobileDateTimePicker onChange={(e) => handleDateChange("endTime", e)} format="DD-MM-YYYY HH:mm a" />
            </DemoItem>
          </LocalizationProvider>
          <Button width={"100%"} onClick={saveEvent} title={"Save Event"} />
        </Box>
      </Modal>
    </div>
  );
}
