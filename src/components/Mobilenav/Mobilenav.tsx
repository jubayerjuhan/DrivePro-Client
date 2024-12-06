import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Logo from "../../assets/logo.png";
import "./Mobilenav.scss";
const Mobilenav = ({ onClick }: any) => {
  return (
    <nav className="mobileNav">
      <div className="mobileNav__image">
        <a href="/">
          <img src={Logo} alt="" />
        </a>
      </div>
      <div className="mobileNav__button">
        <GiHamburgerMenu
          onClick={onClick}
          size={30}
          className="mobilenav__hamburger-icon"
        />
      </div>
    </nav>
  );
};

export default Mobilenav;
