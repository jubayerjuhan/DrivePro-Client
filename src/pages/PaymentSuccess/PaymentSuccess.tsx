import React, { useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import Button from "../../components/core/Button/Button";
import { BsFillCheckCircleFill } from "react-icons/bs";
import "./PaymentSuccess.scss";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { DELETE_BOOKING, DELETE_CART } from "../../redux/reducer/reduxNamings";
import { toast } from "material-react-toastify";
import HelmetTitle from "../../components/HelmetTitle/HelmetTitle";

const PaymentSuccess = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  console.log(state, "state...");
  useEffect(() => {
    if (state?.booking) {
      dispatch({ type: DELETE_BOOKING });
      dispatch({ type: DELETE_CART });
      // toast.success("Your Lesson Booking Successful");
    }
    if (state?.credit) {
      dispatch({ type: DELETE_CART });
      toast.success(`${state?.hours} hours credited to your account`);
    }
  }, [state?.hours, state?.booking, state?.credit, dispatch]);

  return (
    <>
      <HelmetTitle title={`Payment Successful - My Instructor`} />

      <Navbar />
      <div className=" sectionPadding payment__success">
        <div className="check__icon">
          <BsFillCheckCircleFill />
        </div>
        <div className="payment__success-information">
          <p className="title">Payment Successfull 💸</p>
          <p className="description">
            Your Payment To <span>MY INSTRUCTOR</span> as Successfull. Please
            Check Your Email To Download The Invoice, Thank You
          </p>
          <Button
            title={"Go To Home"}
            onClick={() => (window.location.href = "/")}
          ></Button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PaymentSuccess;
