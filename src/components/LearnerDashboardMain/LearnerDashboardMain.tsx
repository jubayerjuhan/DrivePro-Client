import React, { useEffect, useState } from "react";
import avater from "../../assets/reviewavater.jpg";
import Button from "../core/Button/Button";
import { BsGenderMale, BsGenderFemale } from "react-icons/bs";
import "./LearnerDashboardMain.scss";
import LdashInstructor from "../LdashInstructor/LdashInstructor";
import CounterCards from "../CounterCards/CounterCards";
import DashboardBookingsContainer from "../../DashboardBookingsContainer/DashboardBookingsContainer";
import { useSelector } from "react-redux";
import { BookingType, State, User } from "../../typings/reduxTypings";
import { getCurrentUser } from "../../api_calls/user_api";
import { getUserBookings } from "../../api_calls/bookings_api";
import { BookingTypeBack } from "../../typings/bookingsType";
import { MdFormatListBulleted } from "react-icons/md";
import { BsCurrencyDollar } from "react-icons/bs";

const LearnerDashboardMain = ({ setActiveRoute }: any) => {
  console.log(setActiveRoute, "activvveee");
  const { instructor } = useSelector((state: State) => state.instructor);
  const [bookings, setBookings] = useState<BookingTypeBack[]>();
  const [upcomingBookings, setUpcomingBookings] = useState<BookingTypeBack[]>();
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState<User>({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    licenseStatus: "",
    credit: 0,
    userType: "",
  });

  useEffect(() => {
    getUserAndBookings();
  }, []);
  useEffect(() => {
    countUpcomingBookings();
  }, [bookings]);

  const getUserAndBookings = async () => {
    setLoading(true);
    const user = await getCurrentUser();
    if (user) setUser(user);

    const bookingsFromBack = await getUserBookings();
    if (bookingsFromBack) {
      setBookings(bookingsFromBack);
    }
    setLoading(false);
  };

  // count upcoming bookings
  const countUpcomingBookings = () => {
    const uBookings: BookingTypeBack[] = [];

    bookings?.forEach((booking) => {
      if (Date.parse(booking.time.from) > Date.now()) {
        uBookings.push(booking);
      }
    });
    setUpcomingBookings(uBookings);
  };

  return (
    <div className="learner__dashboard-main dashboard__padding">
      {instructor && <LdashInstructor instructor={instructor} />}
      <div className="ldash__counters">
        <CounterCards
          loading={loading}
          title={"Credits"}
          count={user.credit}
          icon={<BsCurrencyDollar />}
        />
        <CounterCards
          loading={loading}
          title={"Bookings"}
          count={bookings ? bookings.length : 0}
          icon={<MdFormatListBulleted />}
        />
        <CounterCards
          loading={loading}
          title={"Upcoming Bookings"}
          count={upcomingBookings ? upcomingBookings.length : 0}
          icon={<MdFormatListBulleted />}
        />
      </div>
      <div className="dash__bookings-list">
        <DashboardBookingsContainer
          loading={loading}
          setActiveRoute={setActiveRoute}
          title={"Upcoming Bookings"}
          bookings={upcomingBookings ? upcomingBookings : []}
        />
        <DashboardBookingsContainer
          loading={loading}
          setActiveRoute={setActiveRoute}
          title={"Bookings History Bookings"}
          bookings={bookings ? bookings : []}
        />
      </div>
    </div>
  );
};

export default LearnerDashboardMain;
