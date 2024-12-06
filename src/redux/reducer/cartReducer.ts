import { Action } from "../actions/actionTypings";
import { DELETE_CART, SET_BILLING, SET_CART } from "./reduxNamings";

export const cartReducer = (
  state = {
    cart: {},
  },
  action: Action
) => {
  switch (action.type) {
    case SET_CART:
      return {
        ...state,
        cart: action.payload,
      };
    case DELETE_CART:
      return {
        cart: null,
      };
    case SET_BILLING:
      return {
        ...state,
        billingInfo: action.payload,
      };

    default:
      return state;
  }
};
