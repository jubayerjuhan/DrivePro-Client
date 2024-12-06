import moment from "moment";
import React from "react";
import { AiOutlineOrderedList } from "react-icons/ai";
import { useDispatch } from "react-redux";
import ViewBookingPage from "../pages/ViewBookingPage/ViewBookingPage";
import { SET_ACTIVE_BOOKING } from "../redux/reducer/reduxNamings";
import { BookingTypeBack } from "../typings/bookingsType";
import BeatLoader from "react-spinners/BeatLoader";
import "./DashboardBookingsContainer.scss";

export interface DashboadsBookingListProps {
  title: string;
  bookings: BookingTypeBack[];
  setActiveRoute?: any;
  instructor?: boolean;
  loading?: boolean;
}
const DashboardBookingsContainer = ({
  loading,
  title,
  bookings,
  setActiveRoute,
  instructor,
}: DashboadsBookingListProps) => {
  const dispatch = useDispatch();

  //handle order click
  const handleOrderClick = (booking: BookingTypeBack) => {
    dispatch({ type: SET_ACTIVE_BOOKING, payload: booking });
    setActiveRoute({
      label: "Upcoming Bookings",
      link: "purchases",
      icon: AiOutlineOrderedList,
      component: ViewBookingPage,
    });
  };
  return (
    <div className="dash__booking-container">
      <p className="title">{title}</p>
      <div className="bookings__list">
        {bookings.map((booking, key) => {
          return (
            <div
              className="dash__booking"
              key={key}
              onClick={() => handleOrderClick(booking)}
            >
              <div className="avater">
                <img
                  src={
                    instructor
                      ? booking?.user?.avater
                      : booking?.instructor?.avater
                  }
                  alt=""
                />
              </div>
              <div className="dash__booking-body">
                <p className="title">
                  Booking With{" "}
                  {instructor
                    ? booking.user?.firstName
                    : booking?.instructor?.firstName}
                </p>
                <div className="booking__desc">
                  <p className="time">
                    {moment(booking.time.from).format("MMM Do YY h:mm a ")}
                  </p>
                  <p
                    className="time bookingStatus"
                    style={{
                      fontWeight: "bold",
                      color:
                        booking?.status === "Pending" ? "#faa41a" : "#429E01",
                    }}
                  >
                    Status: {booking.status}
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        {bookings.length <= 0 && (
          <div className="booking__list-empty">
            {loading ? (
              <BeatLoader color="#faa41a" />
            ) : (
              <p className="title">No Bookings Available</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardBookingsContainer;
