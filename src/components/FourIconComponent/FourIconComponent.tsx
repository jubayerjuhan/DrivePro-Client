import React from "react";
import { AiOutlineStar } from "react-icons/ai";
import { HiOutlineArrowSmRight } from "react-icons/hi";
import { AiOutlineSafety } from "react-icons/ai";
import { TbHeartHandshake,TbCertificate } from "react-icons/tb";
import Button from "../core/Button/Button";
import "./FourIconComponent.scss";

const FourIconComponent = () => {
  const dynamicqualities = [
    {
      title: "Ratings",
      description:
        "Check out peer reviews to identify instructors who regularly deliver a positive learning environment",
      icon: <AiOutlineStar />,
    },
    {
      title: "Certifications",
      description:
        "We always collect the most recent versions of the necessary instructor certifications and confirm their working with children abilities also",
      icon: <TbCertificate />,
    },
    {
      title: "Driving Safety",
      description:
        "Find out the safety rating, make, and model of the instructor's car with details",
      icon: <AiOutlineSafety />,
    },
    {
      title: "Only you matters",
      description:
        "If you don't like your current instructor, you can change them at any moment by using our service. Because your choice solely affects us, we don't even need an explanation",
      icon: <TbHeartHandshake />,
    },
  ];
  return (
    <section className="dynamic__qualities-wrapper sectionPadding">
      <div className="dynamic__qualities">
        <p className="title">Enroll In Driving Classes With Assurance.</p>
        <p className="description">
          Don’t be afraid! just sign up for your driving lessons and pick a
          driving instructor you can rely on.
        </p>
        <div className="qualities__container">
          {dynamicqualities.map((quality, key) => (
            <div className="dynamic__quality" key={key}>
              <div className="icon">{quality.icon}</div>
              <p className="title">{quality.title}</p>
              <p className="description">{quality.description}</p>
            </div>
          ))}
        </div>
      </div>
      <Button title="SO BOOK RIGHT AWAY" width="30vw" className="bookbutton" />
    </section>
  );
};

export default FourIconComponent;
