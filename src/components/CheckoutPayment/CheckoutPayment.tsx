import React, { useEffect, useState } from "react";
import "./CheckoutPayment.scss";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { client } from "../../client";
import PaymentContainer from "../PaymentContainer/PaymentContainer";
import { useSelector } from "react-redux";
import { State } from "../../typings/reduxTypings";
import { BillingInfo } from "../../typings/cartTypings";

interface CheckoutProps {
  billing: BillingInfo;
  checkoutBooking: boolean;
  testPackage: boolean;
  giftcard?: any;
  giftCardInfo: {
    _id: string;
    amount: number;
  };
}
const CheckoutPayment = ({
  giftcard,
  billing,
  giftCardInfo,
  checkoutBooking,
  testPackage,
}: CheckoutProps) => {
  const { cart } = useSelector((state: State) => state.cart);
  const [clientSecret, setClientSecret] = useState();
  const [price, setPrice] = useState(0);
  const stripePromise = loadStripe(
    "pk_test_51Lw6rGLGvcb0YzQkg35iKfntof6nBErDNYfP7mWXaozs6dLwqJsiCrWGISICkprAo7pjwC1XdNKzPxHaVBX5IW1100HUQxmArx"
  );

  const { price: tripPrice } = useSelector((state: State) => state.lessonPrice);
  const { suburb } = useSelector((state: State) => state.suburb);

  useEffect(() => {
    getPrice();
  }, [giftcard, testPackage]);

  const getPrice = () => {
    if (testPackage) {
      setPrice(tripPrice?.testPrice);
      return getPaymentIndent(tripPrice?.testPrice);
    }
    if (giftcard) {
      setPrice(giftcard?.amount * tripPrice.outsidePrice);

      return getPaymentIndent(giftcard?.amount * suburb.price);
    }
    setPrice(cart?.price);
    getPaymentIndent(cart?.price);
  };
  const getPaymentIndent = async (amount: any) => {
    const { data } = await client.post("/payment-indent", {
      amount: amount,
    });
    setClientSecret(data.clientSecret);
  };

  if (!clientSecret) return <></>;

  return (
    <div className="checkout__payment">
      <p className="title">Payment</p>
      <form className="payment__form">
        {clientSecret && (
          <>
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <PaymentContainer
                testPackage={testPackage}
                price={price}
                checkoutBooking={checkoutBooking}
                billing={billing}
                giftcard={giftcard}
                giftCardInfo={giftCardInfo}
              />
            </Elements>
          </>
        )}
      </form>
    </div>
  );
};

export default CheckoutPayment;
