import React from "react";
import { FaCar, FaGraduationCap } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { IoIosPeople } from "react-icons/io";
import "./HomeCounterComponent.scss";

const HomeCounterComponent = () => {
  const counterElements = [
    { count: "6,500+", title: "Learned From Here", icon: <FaGraduationCap /> },
    { count: "100+", title: "Top Instructors", icon: <GiTeacher /> },
    { count: "100+", title: "Top Instructors", icon: <IoIosPeople /> },
    { count: "100+", title: "Own Cars", icon: <FaCar /> },
  ];
  return (
    <section className="sectionPadding home__counter-wrapper">
      <div className=" home__counter">
        {counterElements.map((element, key) => (
          <div className="count__card" key={key}>
            {element.icon}
            <div className="count__card-text">
              <p className="count">{element.count}</p>
              <p className="title">{element.title}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeCounterComponent;
