import React from "react";
import Button from "../core/Button/Button";
import "./Home_Giftcard.scss";
import { ImTicket } from "react-icons/im";
import { BsGift } from "react-icons/bs";
import giftCardImage from "../../assets/Gift card-pana.png";
const Home_Giftcard = () => {
  return (
    <section className="home__giftcard sectionPadding">
      <div className="home__giftcard-media">
        <img src={giftCardImage} alt="" />
      </div>
      <div className="home__giftcard-information">
        <p className="title">The gift of life long skills</p>
        <div className="home__giftcard-options">
          <div className="giftcard__option">
            <div className="icon">
              <ImTicket />
            </div>
            <p className="title">Select a coupon</p>
            <p className="description">
              Select how many classes you want to buy
            </p>
          </div>
          <div className="giftcard__option">
            <div className="icon">
              <BsGift />
            </div>
            <p className="title">Give a present</p>
            <p className="description">
              The gift will be delivered by your loved one after providing the
              information.
            </p>
          </div>
        </div>
        <div className="home__giftcard-bookbutton">
          <Button
            className="bookbutton"
            width="100%"
            title="BUY GIFT COUPON"
            onClick={() => (window.location.href = "/gift-card")}
          />
        </div>
      </div>
    </section>
  );
};

export default Home_Giftcard;
