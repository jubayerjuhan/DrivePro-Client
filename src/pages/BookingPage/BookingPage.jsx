import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import "./BookingPage.scss";
import { CartInstructor } from "../AddToCart/AddToCart";
import Button from "../../components/core/Button/Button";
import { BsCalendar2Date } from "react-icons/bs";
import BookingSelector from "../../components/BookingSelector/BookingSelctor";
import { useSelector } from "react-redux";
import TestPackageSelector from "../../components/TestPackageSelector/TestPackageSelector.jsx";
import HelmetTitle from "../../components/HelmetTitle/HelmetTitle.jsx";
const BookingPage = () => {
  const [bookDrivingLesson, setBookDrivingLesson] = useState({
    visible: null,
    type: "",
  });
  const { instructor } = useSelector((state) => state.instructor);
  useEffect(() => {
    if (!instructor) window.location.href = "/";
  }, [instructor]);
  console.log(instructor);

  if (!instructor) return <></>;
  return (
    <div className="booking-page">
      <HelmetTitle title={`Booking - My Instructor`} />

      <Navbar />
      <div className="booking-main sectionPadding">
        <div className="booking__wrapper">
          <div className="booking__header">
            <div className="icon">
              <BsCalendar2Date />
            </div>
            <p>Book Now</p>
          </div>
          {bookDrivingLesson.visible ? (
            <>
              {bookDrivingLesson.type === "booking" && <BookingSelector />}
              {bookDrivingLesson.type === "test-package" && (
                <TestPackageSelector />
              )}
            </>
          ) : (
            <div className="booking__buttons">
              <Button
                revertColor
                width={"100%"}
                title={"Book Driving Lesson"}
                onClick={() =>
                  setBookDrivingLesson({ visible: true, type: "booking" })
                }
              />
              <Button
                revertColor
                width={"100%"}
                title={"Book Test Package"}
                onClick={() =>
                  setBookDrivingLesson({ visible: true, type: "test-package" })
                }
              />
              <Button
                width={"100%"}
                onClick={() => (window.location.href = "/add-cart")}
                title={"Continue Without Driving Lesson"}
              />
            </div>
          )}
        </div>
        <CartInstructor instructor={instructor} />
      </div>
      <Footer />
    </div>
  );
};

export default BookingPage;
