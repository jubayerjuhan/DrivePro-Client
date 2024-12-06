import React, { useEffect, useState } from "react";
import "./InstructorDashboardMain.scss";
import "../LearnerDashboardMain/LearnerDashboardMain.scss";
import CounterCards from "../CounterCards/CounterCards";
import { BsCurrencyDollar } from "react-icons/bs";
import DashboardBookingsContainer from "../../DashboardBookingsContainer/DashboardBookingsContainer";
import {
  getInstructorBookings,
  getSingleInstructor,
} from "../../api_calls/instructor_api";
import { useSelector } from "react-redux";
import { State } from "../../typings/reduxTypings";
import { BookingTypeBack } from "../../typings/bookingsType";
import { Instructor } from "../../typings/instructorTypings";
import { toast } from "material-react-toastify";
import {
  InstructorAvailablePayoutAmount,
  getInstructorAvailablePayoutAmount,
} from "../../api_calls/earnings_api";

const InstructorDashboardMain = ({ setActiveRoute }: any) => {
  const [bookings, setBookings] = useState<BookingTypeBack[]>([]);
  const [upcomingBookings, setUpcomingBookings] = useState<BookingTypeBack[]>();
  const [pendingBookings, setPendingBookings] = useState<BookingTypeBack[]>();
  const [loading, setLoading] = useState(false);
  const [fetchedInstructor, setFetchedInstructor] = useState<Instructor>();
  const [payoutAmount, setPayoutAmount] = useState<number>();

  const { user: instructor } = useSelector((state: State) => state.user);
  useEffect(() => {
    getBookingsByInstructor();
    fetchInstructor();
  }, []);
  useEffect(() => {
    countUpcomingBookings();
    getDashboardDataOnRender();
  }, [bookings]);

  // getting dashboard data on render
  const getDashboardDataOnRender = async () => {
    try {
      const amount: InstructorAvailablePayoutAmount =
        await getInstructorAvailablePayoutAmount();
      if (typeof amount === "number") setPayoutAmount(amount);
    } catch (error: any) {
      alert(error.message);
    }
  };
  const getBookingsByInstructor = async () => {
    setLoading(true);
    const bookings = await getInstructorBookings(instructor._id);
    setBookings(bookings);
    setLoading(false);
  };

  // fetch instructor from backend
  const fetchInstructor = async () => {
    setLoading(true);
    const data = await getSingleInstructor(instructor._id);
    if (!data.success) {
      setLoading(false);
      return toast.error(data?.message);
    }
    setFetchedInstructor(data?.instructor);
    setLoading(false);
  };

  // count upcoming bookings
  const countUpcomingBookings = () => {
    const uBookings: BookingTypeBack[] = [];
    const penBookings: BookingTypeBack[] = [];

    bookings?.forEach((booking) => {
      if (Date.parse(booking.time.from) > Date.now()) {
        uBookings.push(booking);
      }
      if (booking.status === "Pending") {
        penBookings.push(booking);
      }
    });
    setUpcomingBookings(uBookings);
    setPendingBookings(penBookings);
  };

  console.log(bookings, upcomingBookings);
  return (
    <div className="instructor__dashboard-main">
      <div className="dashboard__counters-instructor dashboard__padding">
        <p className="title">Dashboard Information</p>
        <div className="ldash__counters">
          <CounterCards
            loading={loading}
            title={"Pending Bookings"}
            count={pendingBookings ? pendingBookings.length : 0}
            icon={<BsCurrencyDollar />}
          />
          <CounterCards
            loading={loading}
            title={"Upcoming Bookings"}
            count={upcomingBookings ? upcomingBookings.length : 0}
            icon={<BsCurrencyDollar />}
          />
          <CounterCards
            loading={loading}
            title={"Payout Amount Available"}
            count={`$${payoutAmount ? payoutAmount : 0}`}
            icon={<BsCurrencyDollar />}
          />
        </div>
        <div className="dash__bookings-list">
          <DashboardBookingsContainer
            loading={loading}
            instructor
            setActiveRoute={setActiveRoute}
            title={"Upcoming Bookings"}
            bookings={upcomingBookings ? upcomingBookings : []}
          />
          <DashboardBookingsContainer
            loading={loading}
            instructor
            setActiveRoute={setActiveRoute}
            title={"Bookings History Bookings"}
            bookings={bookings ? bookings : []}
          />
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboardMain;
