import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import Button from "../core/Button/Button";
import "./BookingSelctor.scss";
import { toast } from "material-react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setBookingInfo } from "../../redux/actions/bookingAction";
import { useNavigate } from "react-router-dom";
import { getInstructorBookings, getSingleInstructor } from "../../api_calls/instructor_api";
import { fetchInstructorAvailabilities } from "../../api_calls/instructor_availability";

const BookingSelector = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [bookingTimes, setbookingTimes] = useState([]);
  const [bookingEnd, setbookingEnd] = useState([]);
  // const bookingTimes = [];
  const { instructor } = useSelector((state) => state.instructor);
  const [selectedDate, setSelectedDate] = useState();
  const [instructorAvailabilities, setinstructorAvailabilities] = useState([]);
  const [instructorClosedEvents, setInstructorClosedEvents] = useState([]);
  const [hours, setHours] = useState([]);
  const lessonDuration = [1, 2];
  const [duration, setDuration] = useState(null);
  const [time, setTime] = useState(null);
  const dates = [];

  // get selected Instructor bookings to compare values with time
  const getBookings = useCallback(async () => {
    const bookingTime = [];
    const bookEnd = [];
    const bookings = await getInstructorBookings(instructor._id);
    bookings.forEach((booking) => {
      bookingTime.push(Date.parse(booking.time.from));
      bookEnd.push(Date.parse(booking.time.to));
    });
    setbookingTimes(bookingTime);
    setbookingEnd(bookEnd);
  }, [instructor._id]);

  // fetch bookings and instructor availabilities
  useEffect(() => {
    getBookings();
    fetchInstructorAvailabilities(instructor._id, setinstructorAvailabilities);
    fetchInstructor(instructor._id);
  }, [getBookings, instructor._id]);

  const fetchInstructor = async (instructor) => {
    const instructorData = await getSingleInstructor(instructor);
    setInstructorClosedEvents(instructorData.instructor?.closedEvents);
  };

  const getDate = async () => {
    for (let index = 0; index < 30; index++) {
      const date = moment().add(index, "days");
      dates.push(date);
    }
  };
  getDate();

  // handle duration change
  const handleDurationChange = (e) => {
    setDuration(parseInt(e.target.value));
    setSelectedDate(null);
    setTime(null);
  };

  // handle date change
  const handleDateChange = (e) => {
    const inputDate = JSON.parse(e.target.value);
    setSelectedDate(inputDate);

    const addHour = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
    const twoAddHour = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22];
    const hrs = [];
    if (inputDate) {
      if (duration === 2) {
        twoAddHour.forEach((hour) => {
          hrs.push(moment(inputDate).add(hour, "hour"));
        });
        setHours(hrs);
      } else {
        addHour.forEach((hour) => {
          hrs.push(moment(inputDate).add(hour, "hour"));
        });
        setHours(hrs);
      }
    }
  };

  // handle hour change
  const handleHourChange = (e) => {
    const hour = JSON.parse(e.target.value);
    hour.endTo = JSON.parse(JSON.stringify(moment(hour.startFrom).add(duration, "hour")));
    console.log(hour);

    setTime(hour);
  };

  // handlesubmit
  const handleSubmit = async () => {
    if (!duration) return toast.error("Please Select Duration");
    if (!selectedDate) return toast.error("Please Select Date");
    if (!time) return toast.error("Please Select Time");
    const booking = {
      duration,
      date: selectedDate,
      time,
    };
    const setBooking = dispatch(setBookingInfo(booking));
    if (setBooking) return navigate("/booking-info");
  };

  const unavailableChecker = (date, hour) => {
    const selectedDay = moment(date).format("dddd");
    const daySlot = instructorAvailabilities?.find((slot) => slot.day === selectedDay);

    if (daySlot) {
      let anyAvailable = false;
      for (let i = 0; i < daySlot.slots.length; i++) {
        const slot = daySlot.slots[i];
        const slotStartTime = moment(date).format("YYYY-MM-DD") + " " + slot.startTime;
        const slotEndTime = moment(date).format("YYYY-MM-DD") + " " + slot.endTime;
        if (moment(slotEndTime) >= moment(hour).add(duration, "hour") && moment(slotStartTime) <= hour) {
          anyAvailable = true;
          break;
        }
      }
      return !anyAvailable;
    } else {
      return true;
    }
  };

  const closedEventChecker = (selectedDate, hour, closedEvents) => {
    let closed = false;
    closedEvents.forEach((event) => {
      const available = moment(hour) >= moment(event.startTime) && moment(hour) < moment(event.endTime);
      if (available) return (closed = true);
    });

    return closed;
  };

  return (
    <div className="booking__selector">
      <div className="lesson__duration">
        <p className="title">Lesson Duration</p>
        <div className="form-check lessonDuration__inputs">
          {lessonDuration.map((duration, key) => {
            return (
              <div key={key}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                  value={duration}
                  onChange={handleDurationChange}
                />
                <label className="form-check-label">{duration} Hours </label>
              </div>
            );
          })}
        </div>
        <div className="booking__date-time">
          {duration && (
            <div className="available__date">
              <p className="title">Available Dates</p>
              <select className="form-select" aria-label="Default select example" onChange={handleDateChange}>
                <option value={null}>Select Date</option>
                {dates.map((date, key) => {
                  return (
                    <option value={JSON.stringify(moment(date).startOf("day"))} key={key}>
                      {moment(date).format("ll")}
                    </option>
                  );
                })}
              </select>
            </div>
          )}
          {selectedDate && (
            <div className="available__date">
              <p className="title">Available Time</p>
              <select onChange={handleHourChange} className="form-select" aria-label="Default select example">
                <option selected>Select Hour</option>
                {hours.map((hour, key) => {
                  const fieldValue = {
                    startFrom: hour,
                    endTo: moment(hour).add(duration, "hour"),
                  };
                  if (Date.parse(hour) < Date.now()) {
                    return (
                      <option value={JSON.stringify(fieldValue)} key={key} disabled>
                        {moment(hour).format("hh:mm A")} to {moment(hour).add(duration, "hour").format("hh:mm A")}{" "}
                        Booked Out
                      </option>
                    );
                  }
                  if (
                    unavailableChecker(selectedDate, hour) ||
                    closedEventChecker(selectedDate, hour, instructorClosedEvents) ||
                    bookingTimes.includes(Date.parse(hour)) ||
                    bookingEnd.includes(Date.parse(moment(hour).add(duration, "hour")))
                  ) {
                    return (
                      <option value={JSON.stringify(fieldValue)} key={key} disabled>
                        {moment(hour).format("hh:mm A")} to {moment(hour).add(duration, "hour").format("hh:mm A")}{" "}
                        Booked Out
                      </option>
                    );
                  }
                  return (
                    <option value={JSON.stringify(fieldValue)} key={key}>
                      {moment(hour).format("hh:mm A")} to {moment(hour).add(duration, "hour").format("hh:mm A")}
                    </option>
                  );
                })}
              </select>
            </div>
          )}
        </div>
        <div className="submitBtn">
          <Button title="Continue Booking" width={"100%"} onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default BookingSelector;
