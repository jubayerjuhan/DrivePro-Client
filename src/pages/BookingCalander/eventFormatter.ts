import moment from "moment";
import { BookingType } from "../../typings/reduxTypings";
import { Event } from "./BookingCalander";

/**
 * This function takes the bookings as the params
 * and gives output the event format
 * like => {end: Date, start: Date, title: string}
 */

export const bookingToEventFormatter = (bookings: BookingType[]) => {
  const events: Event[] = [];

  bookings.forEach((booking, index) => {
    if (booking.time.from && booking.time.to)
      events.push({
        end: new Date(booking.time.to),
        start: new Date(booking.time.from),
        title: `Booking With ${booking.instructor.firstName}`,
      });
  });

  console.log(events, "all events");
  return events;
};

interface ClosedEvent {
  startTime: string;
  endTime: string;
  eventName: string;
}
// closed events to events formatter
export const closedEventsFormatter = (closedEvents: ClosedEvent[]) => {
  const events: Event[] = [];

  closedEvents.forEach((event, index) => {
    events.push({
      end: new Date(event.endTime),
      start: new Date(event.startTime),
      title: event.eventName,
    });
  });

  console.log(events, "all events");
  return events;
};
