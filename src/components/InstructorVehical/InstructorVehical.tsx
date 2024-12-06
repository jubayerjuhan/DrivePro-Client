import React from "react";
import { InstructorProfileProps } from "../InstructorProfileInfo/InstructorProfileInfo";
import "./InstructorVehical.scss";

const InstructorVehical = ({ instructor }: InstructorProfileProps) => {
  return (
    <div className="instructor__vehical">
      <p className="title">Vehical Information</p>
      <div className="vehical__info">
        <div className="image">
          <img src={instructor.car.image} alt="" />
        </div>
        <div className="information">
          <p className="name">{instructor.car.name}</p>
          {/* <p className="transmission">
            {instructor.car.transmissionType} Transmission
          </p> */}
          {instructor.car.numberPlate && (
            <p className="numberPlate">{instructor.car.numberPlate}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstructorVehical;
