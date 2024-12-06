import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";

import "./BookingCalander.scss";
import { useCallback, useEffect, useState } from "react";
import { getInstructorBookings, getSingleInstructor } from "../../api_calls/instructor_api";
import { useSelector } from "react-redux";
import { State } from "../../typings/reduxTypings";
import { bookingToEventFormatter, closedEventsFormatter } from "./eventFormatter";
import Button from "../../components/core/Button/Button";
import EventAddTimeSelector from "../../components/EventAddTimeSelector/EventAddTimeSelector";

export interface Event {
  title: string;
  start?: any;
  end?: any;
}
const Bookingcalendar = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [closedEvents, setClosedEvents] = useState([]);
  const localizer = momentLocalizer(moment);
  const [events, setEvents] = useState<Event[]>([
    {
      title: "My Event",
      start: new Date(2023, 5, 18, 1, 0),
      end: new Date(2023, 5, 18, 3, 0), // Adjusted end time
    },
  ]);
  const { user } = useSelector((state: State) => state.user);

  const getBookings = useCallback(async () => {
    try {
      const res = await getInstructorBookings(user._id);
      const events = bookingToEventFormatter(res);
      setEvents(events);
      const closedEventDays = closedEventsFormatter(closedEvents);
      setEvents([...events, ...closedEventDays]);
    } catch (err) {
      console.log(err);
    }
  }, [user._id, closedEvents]);

  useEffect(() => {
    getBookings();
  }, [getBookings]);

  const fetchInstructor = useCallback(async () => {
    const data = await getSingleInstructor(user._id);
    setClosedEvents(data.instructor.closedEvents);
  }, [user._id]);

  useEffect(() => {
    fetchInstructor();
  }, [fetchInstructor]);

  return (
    <div className="booking_calendar">
      <div className="calendar__wrapper">
        <Button
          title={"Add Closed Event"}
          width={"200px"}
          style={{ marginBottom: 10 }}
          onClick={() => setModalOpen(true)}
        />
        <EventAddTimeSelector
          open={modalOpen}
          setOpen={setModalOpen}
          getBookings={getBookings}
          fetchInstructor={fetchInstructor}
        />
        <h4 className="calendar__header" style={{ marginTop: 20 }}>
          Bookings calendar
        </h4>
        <Calendar
          localizer={localizer}
          events={events}
          className="calendar"
          endAccessor={"end"}

          // step={15} // Display time slots at 15-minute intervals
        />
      </div>
    </div>
  );
};

export default Bookingcalendar;
