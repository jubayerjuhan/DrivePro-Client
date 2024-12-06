import React from "react";
import { useSelector } from "react-redux";
import image from "../../assets/learner.png";
import { State } from "../../typings/reduxTypings";
import "./TestPackageBanner.scss";

const TestPackageBanner = ({ price }: any) => {
  const { price: lessonPrice } = useSelector(
    (state: State) => state.lessonPrice
  );
  return (
    <div className="test__package-banner-wrapper">
      <p className="title">Test Package</p>
      <div className="test__package-banner">
        <div className="image">
          <img src={image} alt="" />
        </div>
        <div className="information">
          <ul className="menu__qualities">
            <li className="quality">Pick-up 1hr prior to test start time</li>
            <li className="quality">45 min pre-test warm up</li>
            <li className="quality">
              Use of instructors vehicle to sit the test
            </li>
            <li className="quality">
              Drop-off after the test result is received
            </li>
          </ul>
          <p className="title">Price: ${lessonPrice.testPrice}</p>
        </div>
      </div>
    </div>
  );
};

export default TestPackageBanner;
