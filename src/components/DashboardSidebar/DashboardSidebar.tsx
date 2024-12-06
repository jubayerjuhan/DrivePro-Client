import React from "react";
import logo from "../../assets/logo.png";
import "./DashboardSidebar.scss";
import { DashboardProps } from "../Dashboard/Dashboard";
import { FaTimes } from "react-icons/fa";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
const DashboardSidebar = ({ links, sidebar, setActiveRoute, setSidebar }: DashboardProps) => {
  const dispatch = useDispatch<any>();
  const handleLinkClick = (link: any) => {
    setSidebar(false);
    if (link) return setActiveRoute(link);
  };

  // logout
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    window.location.href = "/";
  };
  return (
    <>
      <div className={`dashboard__sidebar ${sidebar ? "sidebarMobile__active" : ""}`}>
        <FaTimes className="mobile__times" onClick={() => setSidebar(false)} />
        <div className="dashboard__sidebar-header">
          <a href="/">
            <div className="logo">
              <img src={logo} alt="" />
            </div>
          </a>
        </div>
        <div className="dashboard__nav-links">
          {links.map((link) => (
            <div className="dashboard__nav-link dashboard__nav-activ" onClick={() => handleLinkClick(link)}>
              <link.icon />
              <p className="link">{link.label}</p>
            </div>
          ))}
          <div className="dashboard__nav-link dashboard__nav-activ" onClick={logout}>
            <LogoutIcon />
            <p className="link">{"Log Out"}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardSidebar;
