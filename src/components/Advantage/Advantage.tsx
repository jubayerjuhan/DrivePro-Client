import React from "react";
import Button from "../core/Button/Button";
import FaqComponent from "../FAQ/FaqComponent";
import "./Advantage.scss";
import { GiSteeringWheel } from "react-icons/gi";

const Advantage = () => {
  const faqs = [
    {
      qs: "Book within a glance",
      ans: "Driving lessons may be quickly and easily reserved with My Instructor, giving you complete control and flexibility. When you can control your driving instructor selection and make your own driving lesson bookings through our secure online platform, why deal in a typical way? Just tap and book",
    },
    {
      qs: "Easy Maintenance",
      ans: "Compared to typical driving schools, you have more flexibility in your driving lesson from the time you enter your pickup location. Based on comprehensive driving instructor profiles that include ratings and evaluations from students just like you. Select, analyse, and reserve your chosen driving instructor and car transmission. What's best? Since reservations are made in real-time, you can schedule your driving lesson at a time that works for you.",
    },
    {
      qs: "Dashboard",
      ans: "Through your secure online account, you may manage your preferences, past reservations, and upcoming driving lesson reservations. Bookings may be changed up to 24 hours before the lesson's start time, which is ideal for people with erratic schedules. Consider a different driving instructor if you choose. At the touch of a button, you can switch driving instructors without being questioned.",
    },
    {
      qs: "The most Diverse Selection of Driving Instructor",
      ans: `We have access to a large number of fully trained driving instructors all around Australia. All  instructors featured via "My Instructor" must have a recent, valid certification for working with children, as well as dual control pedals on their cars for added safety. You can be confident that you're in safe hands with a "My Instructor" driving instructor.`,
    },
  ];
  return (
    <section className="advantage__section sectionPadding">
      <p className="title">My Instructor Expertise</p>
      <div className="advantage__list">
        {faqs.map((faq, key) => {
          return (
            <FaqComponent key={key} faq={faq} icon={<GiSteeringWheel />} />
          );
        })}
      </div>
      <div className="bookbutton">
        <Button title="Book Now" width="30vw" />
      </div>
    </section>
  );
};

export default Advantage;
