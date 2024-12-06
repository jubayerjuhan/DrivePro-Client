import React from "react";
import Button from "../core/Button/Button";
import "./Footer.scss";

const Footer = () => {
  const cities = ["Dhaka", "Chittagong", "Sylhet", "Cox's Bazar", "Noakhali", "Rangpur"];

  const resources = [
    // { name: "Blog", link: "/blog" },
    { name: "About Us", link: "/about-us" },
    { name: "Privacy Policy", link: "/privacy-policy" },
    { name: "Terms and Condition (Learner)", link: "/terms/learner" },
    { name: "Terms and Condition (Instructor)", link: "/terms/instructor" },
    { name: "Become an Instructor", link: "/apply-instructor" },
    {
      name: "Email : admin@myinstructor.com.bd",
      link: "mailto:admin@myinstructor.com.bd",
    },
  ];

  const driveLinks = [
    { name: "Driving Lessons", link: "/driving-lessons" },
    { name: "Test Packages", link: "/test-package" },
    { name: "Gift Vouchers", link: "/gift-card" },
    {
      name: "International Driving License Conversion",
      link: "https://www.vicroads.vic.gov.bd/licences/new-to-victoria/convert-your-overseas-licence",
    },
  ];
  return (
    <div className="footer__component sectionPadding">
      <div className="footer__intro">
        <p className="footer__title">Who is My Instructor?</p>
        <p className="description">
          By assisting new drivers in finding, comparing, and booking verified driving instructors online, My Instructor
          eliminates the headache of selecting a driving school. The My Instructor online platform streamlines the
          scheduling, management, and administration of driving instructors and driving classes across the Australia.
        </p>
      </div>
      <div className="footer__tests">
        {/* <p className="footer__title">Learners Tests Online</p>
        <a href="/knowledge-test" className="footer__link">
          Free Knowledge Test
        </a> */}
        <div className="footer__instructor-city">
          <p className="footer__title">Driving Instructors by City</p>
          <div className="footer__instructor-cities">
            {cities.map((city, key) => (
              <a href={`/driving-lessons/${city.toLowerCase()}`} className="footer__link" key={key}>
                {city} Driving Instructors
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="footer__resources">
        <p className="footer__title">Resources</p>
        <div className="footer__resource-wrapper">
          {resources.map((res, key) => (
            <a href={res.link} className="footer__link" key={key}>
              {res.name}
            </a>
          ))}
        </div>
      </div>
      <div className="footer__drive-links">
        <p className="footer__title">Learn To Drive</p>

        <Button title="Book now" />
        <div className="footer__drive-links">
          {driveLinks.map((driveLink, key) => (
            <a href={driveLink.link} target={"_blank"} className="footer__link" key={key}>
              {driveLink.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
