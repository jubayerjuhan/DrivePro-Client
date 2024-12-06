import React from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/core/Button/Button";
import Footer from "../../components/Footer/Footer";
import HelmetTitle from "../../components/HelmetTitle/HelmetTitle";
import Navbar from "../../components/Navbar/Navbar";
import "../PaymentSuccess/PaymentSuccess.scss";

const GiftcardSuccess = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state?.giftcard) {
    navigate("/not-found");
    return <></>;
  }
  return (
    <>
      <HelmetTitle title={`Giftcard Successful - My Instructor`} />

      <Navbar></Navbar>
      <div className=" sectionPadding payment__success">
        <div className="check__icon">
          <BsFillCheckCircleFill />
        </div>
        <div className="payment__success-information">
          <p className="title">Giftcard Purchase Successfull Successful✅</p>
          <p className="description">
            Your giftcard worth {state?.giftcard?.amount} hour's has been sent
            to {state?.giftcard?.to}
          </p>
          <Button
            title={"Go To Home"}
            onClick={() => (window.location.href = "/")}
          ></Button>
        </div>
      </div>

      <Footer></Footer>
    </>
  );
};

export default GiftcardSuccess;
