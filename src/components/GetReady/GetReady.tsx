import React from "react";
import { GiSteeringWheel } from "react-icons/gi";
import { AiFillCar, AiOutlineIdcard, AiOutlineCar } from "react-icons/ai";
import Button from "../core/Button/Button";
import "./GetReady.scss";

const GetReady = () => {
  const options = [
    {
      title: "Learners ",
      subtitle:
        "Accumulate experience, study for your driving exam, and focus.",
      icon: GiSteeringWheel,
    },
    {
      title: "Choose your vehicle ",
      subtitle:
        "You can learn with your own vehicle or in the vehicle of your instructor. Choice is yours. No pressure. ",
      icon: AiFillCar,
    },
    {
      title: "Licence change",
      subtitle:
        "Change your licence or just get expertise on Australian roads all is possible if you want. ",
      icon: AiOutlineIdcard,
    },
    {
      title: "Book a test",
      subtitle:
        "Make a reservation for a test package that includes pick-up, a pre-test class, use of a car, and drop-off.",
      icon: AiOutlineCar,
    },
  ];
  return (
    <section className="getReady__section sectionPadding">
      <p className="title">Are You Ready?</p>
      <p className="description">
        We matches you with the top driving instructor
      </p>
      <div className="getReady__options">
        {options.map((opt, key) => (
          <div className="getReady__option" key={key}>
            <div className="icon">
              <opt.icon />
            </div>
            <div className="information">
              <p className="title">{opt.title}</p>
              <p className="description">{opt.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
      <Button title="Book Now" width="30vw"></Button>
    </section>
  );
};

export default GetReady;
