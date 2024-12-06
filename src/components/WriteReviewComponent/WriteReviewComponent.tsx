import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import "./WriteReviewComponent.scss";
import { Instructor } from "../../typings/instructorTypings";
import Button from "../core/Button/Button";
import { BookingTypeBack } from "../../typings/bookingsType";
import { toast } from "material-react-toastify";
import { addReview } from "../../api_calls/instructor_api";

interface WriteReviewProps {
  instructor: Instructor;
  booking: BookingTypeBack;
}

interface ReviewTypes {
  review: string;
  rating: number | null;
}
const WriteReviewComponent = ({ instructor, booking }: WriteReviewProps) => {
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState<ReviewTypes>({
    review: "",
    rating: 0,
  });

  // handle review text change
  const handleSubmitReview = async () => {
    if (!review.rating || !review.review) {
      return toast.warn("Please Insert Review and Rating Both");
    }

    const reviewToPost = {
      review: review.review,
      rating: review.rating,
      instructor: instructor._id,
      booking: booking._id,
    };
    setLoading(true);
    const data = await addReview(reviewToPost);

    if (!data.success) {
      setLoading(false);
      return toast.error(data?.message);
    }

    setLoading(false);
    setReviewSuccess(true);
    toast.success("Review Added Successfully");
  };
  if (reviewSuccess) return <></>;

  if (booking.status === "Ended" && booking.reviewed === false)
    return (
      <div className="write__review-main">
        <div>
          <p className="title">
            Your Booking Has Ended With {instructor.firstName}
          </p>
          <p className="subtitle">
            Please Write a small review, how was your booking?
          </p>
        </div>
        <Rating
          name="simple-controlled"
          value={review?.rating}
          size={"large"}
          onChange={(event, newValue) => {
            setReview({ ...review, rating: newValue });
          }}
        />
        <textarea
          name=""
          id=""
          rows={5}
          onChange={(e) => setReview({ ...review, review: e.target.value })}
        />
        <Button
          loading={loading}
          width={"100%"}
          onClick={handleSubmitReview}
          title={"Submit Review"}
        />
      </div>
    );
  return <></>;
};

export default WriteReviewComponent;
