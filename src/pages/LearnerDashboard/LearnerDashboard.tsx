import React, { useEffect } from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
import "./LearnerDashboard.scss";
import { AiOutlineDashboard, AiOutlineUser } from "react-icons/ai";
import NotFoundPage from "../404Page/NotFoundPage";
import { IconType } from "react-icons/lib";
import LearnerDashboardMain from "../../components/LearnerDashboardMain/LearnerDashboardMain";
import Profile from "../ProfilePage/Profile";
import { useSelector } from "react-redux";
import { State } from "../../typings/reduxTypings";
import { useNavigate } from "react-router-dom";
import HelmetTitle from "../../components/HelmetTitle/HelmetTitle";

export interface DashboardLinksTypes {
  label: string;
  link: string;
  icon: IconType;
  component: any;
}
const LearnerDashboard = () => {
  const { user } = useSelector((state: State) => state.user);
  const navigation = useNavigate();
  useEffect(() => {
    if (user.userType !== "learner") return navigation("/not-found");
  }, []);

  const navLinks = [
    {
      label: "Dashboard",
      link: "dashbaord",
      icon: AiOutlineDashboard,
      component: LearnerDashboardMain,
    },
    {
      label: "Profile",
      link: "profile",
      icon: AiOutlineUser,
      component: Profile,
    },
  ];
  return (
    <>
      <HelmetTitle title={`Learner Dashboard - My Instructor`} />

      <Dashboard links={navLinks} />
    </>
  );
};

export default LearnerDashboard;
