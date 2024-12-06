import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import Button from "../core/Button/Button";
import "./HowItWorks.scss";
import carImage from "../../assets/carinstructor.jpg";

const HowItWorks = () => {
  const bullets = [
    {
      title: "Choose Your Driving Instructor",
      description:
        "Select from a wide range of local instructors. View ratings and reviews left by actual students.  ",
    },
    {
      title: "Register for Driving Lessons",
      description:
        "Make bookings and get confirmation right away. Utilising our web dashboard, you can easily manage your lesson plan.",
    },
    {
      title: "Know How To Drive ",
      description:
        "You are picked up by your instructor and driven to the address of your choice.",
    },
  ];
  return (
    <section className="how__works-wrapper sectionPadding">
      <div className="how__works">
        <div className="how__works-text">
          <p className="title">How "My Instructor" Operates</p>
          <p className="description">Flexible & easy to use booking system</p>
          <div className="how__works-bullets">
            {bullets.map((elem, key) => (
              <div className="how__works-bullet" key={key}>
                <div className="how__works-bullet-icon">
                  <FaCheckCircle size={30} />
                </div>
                <div className="how__works-bullet-body">
                  <p className="title">{elem.title}</p>
                  <p className="description">{elem.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="how__works-media">
          <img className="how__works-media-image" src={carImage} alt="" />
        </div>
      </div>
      <Button width="30vw" className="bookbutton" title="Book Now" />
    </section>
  );
};

export default HowItWorks;
