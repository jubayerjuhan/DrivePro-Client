import React, { useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import PricingCalculator from "../../components/PricingCalculator/PricingCalculator";
import "./AddToCart.scss";
import { Instructor } from "../../typings/instructorTypings";
import { useSelector } from "react-redux";
import { State } from "../../typings/reduxTypings";
import { useLocation, useNavigate } from "react-router-dom";
import HelmetTitle from "../../components/HelmetTitle/HelmetTitle";

const AddToCart = () => {
  const { state } = useLocation();
  console.log(state?.bookForward, "book Forward");
  const { instructor } = useSelector((state: State) => state.instructor);
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!instructor) navigate("/");
  }, [instructor, navigate]);

  if (!instructor) return <></>;
  return (
    <div className="add__cart-page">
      <HelmetTitle title={`Add To Cart - My Instructor`} />

      <Navbar />
      <p className="title">Add To Cart</p>
      <div className="add__cart-main sectionPadding">
        <div className="cart__wrapper">
          <PricingCalculator cart bookForward={state?.bookForward} />
          <CartInstructor instructor={instructor} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

interface CartInstructorProps {
  instructor: Instructor;
}
export const CartInstructor = ({ instructor }: CartInstructorProps) => {
  return (
    <div className="cart__instructor-wrapper">
      <p className="title">Your Instructor:</p>
      <div className="cart__instructor">
        <div className="image">
          <img src={`${instructor.avater}`} alt="" />
        </div>
        <div className="information">
          <p className="title">
            {instructor.firstName} {instructor.lastName}
          </p>
          <div className="state">
            <p>
              {instructor.firstName} speaks{" "}
              {instructor.languages.map((lan, key) => {
                return (
                  <span key={key}>
                    {key !== 0 ? ", " : ""}
                    {lan}
                  </span>
                );
              })}
            </p>
            <p>Car: {instructor.car.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToCart;
