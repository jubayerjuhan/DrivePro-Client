import React, { useEffect } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/core/Button/Button";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import "../PaymentSuccess/PaymentSuccess.scss";
import { Instructor } from "../../typings/instructorTypings";
import { BookingType } from "../../typings/reduxTypings";
import { useDispatch } from "react-redux";
import { DELETE_BOOKING } from "../../redux/reducer/reduxNamings";
import moment from "moment";
import HelmetTitle from "../../components/HelmetTitle/HelmetTitle";

interface BookingSuccessState {
  state: {
    instructor: Instructor;
    booking: BookingType;
  };
}
const BookingSuccess = () => {
  const { state }: BookingSuccessState = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { instructor, booking } = state;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!instructor || !booking) return navigate("/");
    dispatch({ type: DELETE_BOOKING });
  }, [state, instructor, booking, navigate, dispatch]);

  if (!instructor || !booking) return <></>;
  return (
    <>
      <HelmetTitle title={`Booking Success - My Instructor`} />

      <Navbar />
      <div className=" sectionPadding payment__success">
        <div className="check__icon">
          <BsFillCheckCircleFill />
        </div>
        <div className="payment__success-information">
          <p className="title">Booking Successful✅</p>
          <p className="description">
            Your Booking With{" "}
            <span>
              {instructor.firstName} {instructor.lastName}
            </span>{" "}
            from {moment(booking.time.startFrom).format("lll")} to{" "}
            {moment(booking.time.endTo).format("LT")} is Successful. Please
            Check Your Email or Go To Your Learner Dashboard To See More
            Information, Thank You.
          </p>
          <Button
            title={"Go To Home"}
            onClick={() => (window.location.href = "/")}
          ></Button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookingSuccess;
