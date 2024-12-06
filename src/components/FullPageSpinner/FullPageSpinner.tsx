import React from "react";
import BeatLoader from "react-spinners/BeatLoader";
import "./FullPageSpinner.scss";

const FullPageSpinner = () => {
  return (
    <div className="fullpage__spinner">
      <BeatLoader color={"#faa41a"} />
    </div>
  );
};

export default FullPageSpinner;
