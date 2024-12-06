import React from "react";
import BounceLoader from "react-spinners/BounceLoader";

const Spinner = ({ size }) => {
  return <BounceLoader color="#fee100" size={size ? size : 40} />;
};

export default Spinner;
