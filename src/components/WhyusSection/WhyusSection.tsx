import React from "react";
import { TiChevronRight } from "react-icons/ti";
import Button from "../core/Button/Button";
import "./WhyusSection.scss";

const WhyusSection = () => {
  const reasons = [
    "Reviews, ratings, and profiles of driving instructors",
    "Online management of your driving lesson reservations",
    "Online changes to your driving instructor",
    "Flexible scheduling for driving lessons",
    "Driving instructors with licences and accreditation",
    "Use your own vehicle or choose from the auto or manual options!",
    "Your very own personal driving instructor",
    "Examine each driving school in your neighbourhood",
    "Nice and understanding male and female driving instructors",
  ];
  return (
    <section className="whyus__container sectionPadding">
      <p className="title"> What Makes You Pick "My Instructor"?</p>
      <p className="description">
        My Instructor, an Australian exclusive platform, allows trainee drivers
        and parents to search, compare, and book certified driving instructors
        online, unlike a normal driving school. This platform makes the process
        of choosing a driving coach and managing driving lessons continuous,
        transparent, flexible, and efficient. Choose your own individual driving
        instructor from the most options available in Australia. Online
        real-time driving lesson reservations
      </p>
      <div className="whyus__reasons">
        {reasons.map((reason, key) => (
          <div className="whyus__reason" key={key}>
            <div className="icon">
              <TiChevronRight />
            </div>
            <p className="title">{reason}</p>
          </div>
        ))}
      </div>
      <div className="bookbutton">
        <Button title="Book Now" width="30vw"></Button>
      </div>
    </section>
  );
};

export default WhyusSection;
