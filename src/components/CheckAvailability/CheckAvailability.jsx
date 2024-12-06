import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import "./CheckAvailability.scss";
import moment from "moment";
import { getInstructorBookings } from "../../api_calls/instructor_api";
import { FaTimes } from "react-icons/fa";
import { fetchInstructorAvailabilities } from "../../api_calls/instructor_availability";

const CheckAvailability = ({ instructor, setShowModal, visible }) => {
  // instructor = {id: "instructorid", name: "Instructor Name"}
  const [dates, setDates] = useState([]);
  const [instructorAvailabilities, setinstructorAvailabilities] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [bookedHours, setBookedHours] = useState([]);
  const [bookingEndHours, setBookingEndHours] = useState([]);
  const hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
  useEffect(() => {
    getDate();
    getBookings();
  }, []);

  useEffect(() => {
    fetchInstructorAvailabilities(instructor._id, setinstructorAvailabilities);
  }, [instructor._id]);

  const getBookings = async () => {
    const unixBookingTime = [];
    const unixBookingEndTime = [];
    const bookings = await getInstructorBookings(instructor.id);
    setBookings(bookings);

    bookings.forEach((booking) => {
      if (booking?.time?.from) {
        unixBookingTime.push(Date.parse(booking?.time?.from));
        unixBookingEndTime.push(Date.parse(booking?.time?.to));
      }
    });
    setBookedHours(unixBookingTime);
    setBookingEndHours(unixBookingEndTime);
  };

  // get next 30 days
  const getDate = async () => {
    const generatedDates = [0];
    for (let index = 0; index < 30; index++) {
      const date = moment().startOf("day").add(index, "days");
      generatedDates.push(date);
    }
    setDates(generatedDates);
  };

  // unavailable checker
  const unavailableChecker = (date, hour) => {
    const selectedDay = moment(date).format("dddd");
    const daySlot = instructorAvailabilities?.find((slot) => slot.day === selectedDay);

    if (daySlot) {
      let anyAvailable = false;
      for (let i = 0; i < daySlot.slots.length; i++) {
        const slot = daySlot.slots[i];
        const slotStartTime = moment(date).format("YYYY-MM-DD") + " " + slot.startTime;
        const slotEndTime = moment(date).format("YYYY-MM-DD") + " " + slot.endTime;
        if (moment(slotEndTime) >= moment(hour).add(1, "hour") && moment(slotStartTime) <= hour) {
          anyAvailable = true;
          break;
        }
      }
      return anyAvailable;
    } else {
      return true;
    }
  };
  return (
    <Modal
      open={visible}
      onClose={() => {}}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        outline: "none",
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="chv__modal">
        <FaTimes
          size={30}
          style={{ cursor: "pointer" }}
          className={"times__icon"}
          onClick={() => setShowModal(false)}
        />
        <div className="chv__modal-header">
          <p className="title">Booking Availability Of {instructor?.name}</p>
          <div className="indicator">
            <div className="indicator__child">
              <div className="available"></div>
              <p>Available</p>
            </div>
            <div className="indicator__child">
              <div className="booked"></div>
              <p>Booked Out</p>
            </div>
          </div>
        </div>
        <div className="chv__chart">
          {dates.map((date, key) => {
            if (key === 0) {
              return (
                <div className="chv__chart-column" key={key}>
                  <p className="title">Hours</p>
                  <div className="hours">
                    {hours.map((hour, key) => {
                      return (
                        <p className="hour hourrow" key={key}>
                          {moment().startOf("day").add(hour, "hour").format("LT")}
                        </p>
                      );
                    })}
                  </div>
                </div>
              );
            }

            // showing the rows
            return (
              <div className="chv__chart-column" key={key}>
                <p className="title">{moment(date).format("MMM Do")}</p>
                <div className="hours">
                  {hours.map((hour, key) => {
                    const uhr = moment(date).add(hour, "hour");
                    const isAvailable = unavailableChecker(date, hour);
                    console.log(isAvailable);
                    if (
                      bookedHours.includes(Date.parse(uhr)) ||
                      bookingEndHours.includes(Date.parse(uhr)) ||
                      unavailableChecker(date, hour)
                    ) {
                      return <p className="hour booked__hour" key={key}></p>;
                    }
                    return <p className="hour normal__hour" key={key}></p>;
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};

export default CheckAvailability;
