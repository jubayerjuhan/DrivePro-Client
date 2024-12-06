import React from "react";
import Rating from "@mui/material/Rating";
import "./InstructorReviewComponent.scss";
import { Review } from "../../typings/instructorTypings";

interface Props {
  review: Review;
}
const InstructorReviewComponent = ({ review }: Props) => {
  return (
    <div className="instructor__review">
      <p className="title">{review.user}</p>
      <div className="rating">
        <Rating name="read-only" readOnly value={review.rating} />
      </div>
      <p className="description">{review.message}</p>
    </div>
  );
};

export default InstructorReviewComponent;
