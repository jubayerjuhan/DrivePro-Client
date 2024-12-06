import React from "react";
import { BookingTypeBack } from "../../typings/bookingsType";
import Button from "../core/Button/Button";

interface changeBookingProps {
  booking: BookingTypeBack;
  changeBookingStatus: any;
  title: String;
  loading: boolean;
}
const ConfirmBooking = ({
  title,
  booking,
  loading,
  changeBookingStatus,
}: changeBookingProps) => {
  return (
    <>
      <div className="booking__accept">
        <p className="title">{title}</p>
        <div className="buttons">
          <Button
            title={"No"}
            revertColor
            onClick={() => changeBookingStatus(false)}
          />
          <Button
            loading={loading}
            title={"Yes"}
            onClick={() => changeBookingStatus(true)}
          />
        </div>
      </div>
    </>
  );
};

export default ConfirmBooking;
