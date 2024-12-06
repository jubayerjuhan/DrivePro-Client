import React, { useEffect } from "react";
import {
  AiOutlineDashboard,
  AiOutlineCalendar,
  AiFillMoneyCollect,
  AiFillCalendar,
  AiOutlineUser,
  AiOutlineDollar,
} from "react-icons/ai";
import { TbCarOff } from "react-icons/tb";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Dashboard from "../../components/Dashboard/Dashboard";
import Earnings from "../../components/Earnings/Earnings";
import HelmetTitle from "../../components/HelmetTitle/HelmetTitle";
import InstructorDashboardMain from "../../components/InstructorDashboardMain/InstructorDashboardMain";
import { State } from "../../typings/reduxTypings";
import Profile from "../ProfilePage/Profile";
import InstructorAvailability from "../InstructorAvailability/InstructorAvailability";
import Bookingcalendar from "../BookingCalander/BookingCalander";
import FinancialReporting from "../FinancialReporting/FinancialReporting";
import ClosedEvents from "../../components/ClosedEvents/ClosedEvents";

const InstructorDashboard = () => {
  const { user } = useSelector((state: State) => state.user);
  const navigation = useNavigate();

  useEffect(() => {
    if (user.userType !== "instructor") return navigation("/not-found");
  }, [user.userType, navigation]);
  const navLinks = [
    {
      label: "Dashboard",
      link: "dashbaord",
      icon: AiOutlineDashboard,
      component: InstructorDashboardMain,
    },
    {
      label: "Calendar",
      link: "booking-calendar",
      icon: AiOutlineCalendar,
      component: Bookingcalendar,
    },
    {
      label: "Closed Events",
      link: "closed-events",
      icon: TbCarOff,
      component: ClosedEvents,
    },
    {
      label: "Profile",
      link: "profile",
      icon: AiOutlineUser,
      component: Profile,
    },
    {
      label: "Earnings",
      link: "earnings",
      icon: AiOutlineDollar,
      component: Earnings,
    },
    {
      label: "Financial Reports",
      link: "earnings",
      icon: AiFillMoneyCollect,
      component: FinancialReporting,
    },
    {
      label: "Availability",
      link: "availability",
      icon: AiFillCalendar,
      component: InstructorAvailability,
    },
  ];
  return (
    <>
      <HelmetTitle title={`Instructor Dashboard - My Instructor`} />
      <Dashboard links={navLinks} />
    </>
  );
};

export default InstructorDashboard;
