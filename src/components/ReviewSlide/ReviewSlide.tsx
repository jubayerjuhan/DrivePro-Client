import React from "react";
import "./ReviewSlide.scss";
import Rating from "@mui/material/Rating";
import { IoMdQuote } from "react-icons/io";
import reviewAvater from "../../assets/reviewavater.jpg";

const ReviewSlide = ({ message }: any) => {
  return (
    <div className="review__slide">
      <div className="review__slide-top">
        <p className="title">Jubayer Juhan</p>
        <div className="review__slide-rating">
          <Rating
            name="read-only"
            readOnly
            value={5}
            // onChange={(event, newValue) => {
            //   setValue(newValue);
            // }}
          />
        </div>
        <p className="review__message">{message}</p>
      </div>
      <div className="review__user">
        <div className="avater">
          <img src={reviewAvater} alt="" />
        </div>
        <p className="name">Abir Juhan</p>
      </div>
      <IoMdQuote className="quote__icon" />
    </div>
  );
};

export default ReviewSlide;
