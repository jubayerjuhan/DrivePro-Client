import React, { useState } from "react";
import { BsArrowRight, BsArrowDown } from "react-icons/bs";
import "./FaqComponent.scss";

const FaqComponent = ({ icon, faq }: any) => {
  const [open, setOpen] = useState(false);
  // console.log(faq);
  // return <></>;
  return (
    <div className="faq__component">
      <div
        className={`faq__header ${open ? "active" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <div className="faq__title">
          {icon && <div className="icon">{icon} </div>}{" "}
          <p className="title">{faq?.qs}</p>
        </div>
        <div className="chevron__icon">
          {open ? <BsArrowDown /> : <BsArrowRight />}
        </div>
      </div>
      <div className={`faq__body ${open ? "active " : ""}`}>
        <p className="description">{faq?.ans}</p>
      </div>
    </div>
  );
};

export default FaqComponent;
