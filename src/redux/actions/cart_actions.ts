import { Dispatch } from "react";
import { Action } from "../actions/actionTypings";
import { BillingInfo, Cart } from "../../typings/cartTypings";
import { SET_BILLING, SET_CART } from "../reducer/reduxNamings";

export const addToCart = (cart: Cart) => async (dispatch: Dispatch<Action>) => {
  dispatch({ type: SET_CART, payload: cart });
};

export const addBilling =
  (billingInfo: BillingInfo) => async (dispatch: Dispatch<Action>) => {
    dispatch({ type: SET_BILLING, payload: billingInfo });
  };
