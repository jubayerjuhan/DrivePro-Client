import React, { useEffect, useState } from "react";
import "./CheckoutPage.scss";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { AiOutlineShoppingCart } from "react-icons/ai";
import CheckoutBillings from "../../components/CheckoutBillings/CheckoutBillings";
import CheckoutPayment from "../../components/CheckoutPayment/CheckoutPayment";
import { useSelector } from "react-redux";
import { State } from "../../typings/reduxTypings";
import { toast } from "material-react-toastify";
import { useLocation } from "react-router-dom";
import Button from "../../components/core/Button/Button";
import { validateGiftCard } from "../../api_calls/giftcard_api";
import HelmetTitle from "../../components/HelmetTitle/HelmetTitle";

const CheckoutPage = () => {
  const { state } = useLocation();
  console.log(state?.bookForward, "book Forward checkout");
  const { cart } = useSelector((state: State) => state.cart);
  const { suburb } = useSelector((state: State) => state.suburb);
  const [billings, setBillings] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [coupon, setCoupon] = useState<any>("");
  const { price } = useSelector((state: State) => state.lessonPrice);
  const [giftCardInfo, setGiftCardInfo] = useState<any>({
    _id: "",
    amount: 0,
  });
  const [paymentAvailable, setPaymentAvailable] = useState(false);

  useEffect(() => {
    window.scroll(0, 0);
    if (!cart?.hours && !state?.testPackage && !state.giftcard) {
      window.location.replace("/not-found");
      toast.error("Please Select Bookings Hours First");
    }
  }, [cart]);

  if (!cart?.hours && !state?.testPackage && !state.giftcard) return <></>;

  const submitCoupon = async () => {
    setLoading(true);
    const data = await validateGiftCard(coupon);
    console.log(data);
    if (!data.success) {
      setLoading(false);
      return toast.error(data.message);
    }
    setLoading(false);
    setGiftCardInfo(data?.giftcard[0]);
    toast.success("Giftcard Added Successfully");
  };
  return (
    <>
      <HelmetTitle title={`Checkout - My Instructor`} />

      <Navbar />
      <div className="checkout__page-main sectionPadding">
        <div className="checkout__information">
          {!paymentAvailable ? (
            <CheckoutBillings setBillings={setBillings} setPaymentAvailable={setPaymentAvailable} />
          ) : (
            <CheckoutPayment
              testPackage={state?.testPackage}
              billing={billings}
              giftcard={state?.giftcard}
              checkoutBooking={state?.bookForward}
              giftCardInfo={giftCardInfo}
            />
          )}
        </div>
        <div className="checkout__cart-details">
          <p className="title">On Your Cart</p>
          <div className="cart__details">
            <AiOutlineShoppingCart />
            {state?.testPackage ? (
              <p className="title">You Have Test Package On Your Cart (৳{price.testPrice})</p>
            ) : (
              <>
                {state?.giftcard ? (
                  <p className="title">
                    You Have {state.giftcard?.amount} Hours Gift Card In The Cart <br />1 Hour = ৳{suburb.price}
                    <br />
                    {console.log(state?.giftcard?.amount, "amount")}
                    Total: ${price.outsidePrice * state?.giftcard?.amount}
                  </p>
                ) : (
                  <p className="title">You Have {cart?.hours} Hours In The Cart</p>
                )}
              </>
            )}{" "}
          </div>
          {giftCardInfo._id && (
            <div className="checkout__coupon-added">
              <div className="coupon_info">
                <p className="title">Gift Card : </p>
                {giftCardInfo?.amount > 0 && <p className="title"> {giftCardInfo?.amount} Hours</p>}
              </div>
              <div className="coupon_info">
                <p className="title">Code : </p>
                {giftCardInfo?.amount > 0 && <p className="title">{giftCardInfo?.code}</p>}
              </div>
            </div>
          )}
          {!paymentAvailable && !giftCardInfo._id && !state?.giftcard && !state?.testPackage && (
            <div className="coupon__section">
              <input
                onChange={(e) => setCoupon(e.target.value)}
                type={"text"}
                placeholder={"Enter Gift Card Number"}
                className="form-control input__element login"
              />
              <Button loading={loading} title={"Apply"} onClick={submitCoupon} className={"submit-btn"}></Button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;
