import { toast } from "material-react-toastify";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeStatusOfBooking, findBooking } from "../../api_calls/bookings_api";
import ConfirmBooking from "../../components/ConfirmBooking/ConfirmBooking";
import Button from "../../components/core/Button/Button";
import FullPageSpinner from "../../components/FullPageSpinner/FullPageSpinner";
import LdashInstructor from "../../components/LdashInstructor/LdashInstructor";
import WriteReviewComponent from "../../components/WriteReviewComponent/WriteReviewComponent";
import { BookingTypeBack } from "../../typings/bookingsType";
import { State } from "../../typings/reduxTypings";
import "./ViewBookingPage.scss";
import { calculateAge } from "../../utils/age";

const ViewBookingPage = () => {
  const navigate = useNavigate();
  const { booking: activeBooking } = useSelector((state: State) => state.activeBooking);

  console.log(activeBooking, "booking 83");
  const [booking, setBooking] = useState<BookingTypeBack>();
  const { user } = useSelector((state: State) => state.user);
  const [statusChanged, setStatusChanged] = useState(false);
  const [timeOver, setBookingTimeOver] = useState(false);
  const [loading, setLoading] = useState(true);
  const [bookingStatusLoading, setBookingStatusLoading] = useState(false);

  useEffect(() => {
    window.scroll(0, 0);
    getBooking();
  }, [statusChanged]);

  const getBooking = async () => {
    setLoading(true);
    const data = await findBooking(activeBooking._id);
    if (!data.success) {
      setLoading(false);
      return toast.error(data.message);
    }

    if (Date.parse(data.booking?.time.to) < Date.now()) {
      setBookingTimeOver(true);
    }
    setBooking(data.booking);
    setLoading(false);
  };

  // change booking status
  const changeBookingStatus = async (status: boolean) => {
    const bookingStatus = status ? "Approved" : "Canceled";
    setBookingStatusLoading(true);
    try {
      const success = await changeStatusOfBooking(bookingStatus, booking ? booking._id : "");
      if (!success) return toast.error("Error Occoured, Can't Change Booking Status");
      toast.success(`Booking Status Changed ${bookingStatus}`);
      setStatusChanged(!statusChanged);
    } catch (error) {
      alert("Can't Change Booking Status");
    } finally {
      setBookingStatusLoading(false);
    }
  };

  const endBooking = async () => {
    setBookingStatusLoading(true);
    try {
      const success = await changeStatusOfBooking("Ended", booking ? booking._id : "");
      if (!success) return toast.error("Error Occoured, Can't Change Booking Status");
      toast.success(`Booking Status Changed To Ended`);
      setStatusChanged(!statusChanged);
    } catch (err) {
      alert("Can't Change Booking Status");
    } finally {
      setBookingStatusLoading(false);
    }
  };

  if (!booking)
    return (
      <>
        <FullPageSpinner />
      </>
    );

  console.log();

  console.log(booking, "booking 83");
  return (
    <>
      {loading && <FullPageSpinner />}
      <div className="view__booking-page dashboard__padding">
        <div
          className="backButton"
          onClick={() =>
            (window.location.href = user.userType === "instructor" ? "/instructor/dashboard" : "/learner/dashboard")
          }
        >
          <BsArrowLeft />
        </div>
        <p className="title">Booking Infromation</p>

        {/* change booking status */}
        {booking.status === "Pending" && user.userType === "instructor" && (
          <ConfirmBooking
            loading={bookingStatusLoading}
            title={`Do You Want To Confirm Booking With ${booking?.user?.firstName} ?`}
            booking={booking}
            changeBookingStatus={changeBookingStatus}
          />
        )}
        {booking.status === "Approved" && timeOver && user.userType === "instructor" && (
          <ConfirmBooking
            loading={bookingStatusLoading}
            title={`End Booking Successfully! ${booking?.user?.firstName} ?`}
            booking={booking}
            changeBookingStatus={endBooking}
          />
        )}
        {user.userType === "learner" && <LdashInstructor instructor={booking?.instructor} />}
        {user.userType === "learner" && <WriteReviewComponent instructor={booking.instructor} booking={booking} />}
        <div className="view__booking-main">
          <InformationFields title={`Booking Type : `} child1={booking.type ? booking.type : "Regular Booking"} />
          <InformationFields title={"Booking Id :"} child1={booking?._id} />
          <InformationFields
            title={"Learner Information"}
            child1={`Name : ${booking?.user.firstName} ${booking?.user.lastName}`}
            child2={`Age : ${calculateAge(booking?.user.dateOfBirth)}`}
            child3={`License Status : ${booking?.user.licenseStatus} `}
            child4={`Phone : ${booking?.user.phone} `}
            child5={`Email : ${booking?.user.email} `}
            child6={`Accessability: ${booking?.user.accessability ? "Yes" : "No"} `}
          />

          <InformationFields
            title={"Booking Time"}
            child1={`Starts From : ${moment(booking?.time.from).format("MMMM Do YYYY, h:mm:ss a")}`}
            child2={`End To : ${moment(booking?.time.to).format("MMMM Do YYYY, h:mm:ss a")}`}
          />
          <InformationFields title={"Booking Duration"} child1={`Duration: ${booking?.duration} hrs`} />
          <InformationFields
            title={"Booking Status"}
            child1={
              <>
                Status :{" "}
                <span
                  style={{
                    fontWeight: "bold",
                    color: booking?.status === "Pending" ? "#faa41a" : "#429E01",
                  }}
                >
                  {booking?.status}
                </span>
              </>
            }
          />

          <InformationFields
            title={"Pickup Details"}
            child1={`Address: ${booking?.pickupDetails.address}`}
            child2={`Suburb: ${booking?.pickupDetails.suburb.suburb}`}
            child3={`Post Code: ${booking?.pickupDetails.postcode}`}
            child4={`State: ${booking?.pickupDetails.state}`}
          />
        </div>
      </div>
    </>
  );
};

const InformationFields = ({ title, child1, child2, child3, child4, child5, child6 }: any) => {
  return (
    <div className="dash-booking__informations">
      <p className="title">{title}</p>
      {child1 && <p className="info__field">{child1}</p>}
      {child2 && <p className="info__field">{child2}</p>}
      {child3 && <p className="info__field">{child3}</p>}
      {child4 && <p className="info__field">{child4}</p>}
      {child5 && <p className="info__field">{child5}</p>}
      {child6 && <p className="info__field">{child6}</p>}
    </div>
  );
};

export default ViewBookingPage;
