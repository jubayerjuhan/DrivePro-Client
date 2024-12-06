import React from "react";
import steeringIcon from "../../../assets/loader.gif";
import "./steeringIcon.scss";

const SteeringLoader = () => {
  return (
    <div className="steering_loader">
      <img src={steeringIcon} alt="" className="loading_gif" />
      <p className="loading__text">Loading</p>
    </div>
  );
};

export default SteeringLoader;
