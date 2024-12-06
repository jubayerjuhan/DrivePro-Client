import React, { useEffect, useMemo, useState } from "react";
import availabilityData from "../InstructorAvailability/instructorAvailability.data.json";
import "./instructorAvailability.scss";

//
import dayjs from "dayjs";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { Button } from "@mui/material";
import { fetchInstructorAvailabilities, saveInstructorAvailability } from "../../api_calls/instructor_availability";
import { useSelector } from "react-redux";
import { toast } from "material-react-toastify";
import IconButton from "../../components/core/Button/IconButton/IconButton";
import SaveIcon from "@mui/icons-material/Save";

const InstructorAvailability = () => {
  const { user } = useSelector((state) => state.user);
  const [removedSlots, setRemovedSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [instructorAvailability, setInstructorAvailability] = useState([]);
  const [slots, setSlots] = useState({
    Monday: [{ startTime: "", endTime: "" }],
    Tuesday: [{ startTime: "", endTime: "" }],
    Wednesday: [{ startTime: "", endTime: "" }],
    Thursday: [{ startTime: "", endTime: "" }],
    Friday: [{ startTime: "", endTime: "" }],
    Saturday: [{ startTime: "", endTime: "" }],
    Sunday: [{ startTime: "", endTime: "" }],
  });

  useEffect(() => {
    fetchInstructorAvailabilities(user._id, setInstructorAvailability);
  }, [user._id]);

  const availabilityByDay = useMemo(() => {
    return instructorAvailability.reduce((acc, cur) => {
      const { day, slots } = cur;
      acc[day] = slots.map((slot) => ({ startTime: slot.startTime, endTime: slot.endTime }));
      return acc;
    }, {});
  }, [instructorAvailability]);

  useEffect(() => {
    setSlots(availabilityByDay);
  }, [availabilityByDay]);

  const addSlot = (day) => {
    setSlots((prevSlots) => {
      const newSlot = { startTime: "", endTime: "" };
      const newSlots = { ...prevSlots };
      newSlots[day.name].push(newSlot);
      return newSlots;
    });
  };

  // remove slot
  const removeSlot = (day, slotIndex) => {
    setRemovedSlots((prevRemovedSlots) => {
      const newRemovedSlots = [...prevRemovedSlots];
      newRemovedSlots.push({ ...slots[day.name][slotIndex], day: day.name });
      return newRemovedSlots;
    });

    setSlots((prevSlots) => {
      const newSlots = { ...prevSlots }; // create a new object to avoid mutating the previous state
      newSlots[day.name].splice(slotIndex, 1);
      return newSlots;
    });
  };

  const setStartTime = (time, day, slotIndex) => {
    setSlots((prevSlots) => {
      const newSlots = prevSlots;
      newSlots[day.name][slotIndex].startTime = dayjs(time).format("LT");
      return newSlots;
    });
  };
  const setEndTime = (time, day, slotIndex) => {
    setSlots((prevSlots) => {
      const newSlots = prevSlots;
      newSlots[day.name][slotIndex].endTime = dayjs(time).format("LT");
      return newSlots;
    });
  };

  const submitSlots = async () => {
    const slotsArray = [];

    for (const day in slots) {
      const slotsForDay = slots[day];

      slotsForDay.forEach((slot) => {
        const { startTime, endTime } = slot;
        console.log(startTime, "Start Time");
        const formattedStartTime = startTime ? startTime : "";
        const formattedEndTime = endTime ? endTime : "";

        slotsArray.push({
          day,
          startTime: formattedStartTime,
          endTime: formattedEndTime,
        });
      });
    }

    try {
      setLoading(true);
      const status = await saveInstructorAvailability(user._id, slotsArray, removedSlots);
      if (status) return toast.success("Instructor Availability Saved");
      toast.error("Can't Set Availability");
    } catch (error) {
      toast.error("Can't Set Availability");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="availability__page">
      <div className="header">
        <h2 className="title">{availabilityData.title}</h2>
        <p className="description">{availabilityData.description}</p>
      </div>
      <div className="availability__selector">
        {availabilityData.days?.map((day, dayIndex) => {
          return (
            <div className="day__container" key={dayIndex}>
              <p className="day__title">{day.name}</p>
              <div className="slots">
                <Button
                  className="addSlotBtn"
                  variant="contained"
                  onClick={() => addSlot(day)}
                  sx={{ width: 120 }}
                  size="small"
                >
                  Add Slot
                </Button>

                {slots[day.name]?.map((slot, key) => {
                  if (key === 0) return <></>;
                  return (
                    <div className="single_slot" key={key}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoItem label="From">
                          <MobileTimePicker
                            onChange={(value) => setStartTime(value, day, key)}
                            views={["hours"]}
                            value={dayjs()
                              .set("hour", dayjs(slot.startTime, "h:mm A").hour())
                              .set("minute", dayjs(slot.startTime, "h:mm A").minute())}
                          />
                        </DemoItem>
                        <DemoItem label="To">
                          <MobileTimePicker
                            onChange={(value) => setEndTime(value, day, key)}
                            views={["hours"]}
                            value={dayjs()
                              .set("hour", dayjs(slot.endTime, "h:mm A").hour())
                              .set("minute", dayjs(slot.endTime, "h:mm A").minute())}
                          />
                        </DemoItem>
                      </LocalizationProvider>

                      <Button onClick={() => removeSlot(day, key)} variant="contained" size="small" color="error">
                        Delete
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
        <IconButton onClick={submitSlots} Icon={SaveIcon} title="Save Slots" loading={loading} />
      </div>
    </div>
  );
};

export default InstructorAvailability;
