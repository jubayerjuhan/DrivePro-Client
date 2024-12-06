import React, { useState } from "react";
import DashboardSidebar from "../DashboardSidebar/DashboardSidebar";
import "./Dashboard.scss";
import { IconType } from "react-icons/lib";
import { DashboardLinksTypes } from "../../pages/LearnerDashboard/LearnerDashboard";
import { FaHamburger } from "react-icons/fa";
import { useSelector } from "react-redux";
import { State } from "../../typings/reduxTypings";

export interface DashboardProps {
  links: Link[];
  sidebar?: boolean;
  components?: any;
  setActiveRoute?: any;
  setSidebar?: any;
}

type Link = {
  label: string;
  icon: IconType;
  link: string;
  component: any;
};

const Dashboard = ({ links }: DashboardProps) => {
  const [sidebar, setSidebar] = useState(false);
  const [activeRoute, setActiveRoute] = useState<DashboardLinksTypes>(links[0]);

  console.log(activeRoute, "Ac route");

  return (
    <div className="dashboard__wrapper">
      <DashboardSidebar
        sidebar={sidebar}
        setSidebar={setSidebar}
        links={links}
        setActiveRoute={setActiveRoute}
      />
      <DashboardTopBar setSidebar={setSidebar} />
      <div className="dashboard__content">
        <activeRoute.component setActiveRoute={setActiveRoute} />
      </div>
    </div>
  );
};

export default Dashboard;

const DashboardTopBar = ({ setSidebar }: any) => {
  const { user } = useSelector((state: State) => state.user);
  return (
    <div className="dashboard__bar">
      <div>
        <FaHamburger
          className="dash__sidebar-hamburger"
          onClick={() => {
            setSidebar(true);
            window.scroll(0, 0);
          }}
        />
      </div>
      <div className="user__icon">
        <img src={user.avater} alt="" />
        <p className="user__name">{user.firstName}</p>
      </div>
    </div>
  );
};
