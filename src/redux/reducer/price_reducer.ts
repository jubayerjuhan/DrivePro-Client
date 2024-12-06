import { Action } from "../actions/actionTypings";
import { SET_LESSON_PRICE } from "./reduxNamings";

export const priceReducer = (state = {}, action: Action) => {
  switch (action.type) {
    case SET_LESSON_PRICE:
      return {
        ...state,
        price: action.payload,
      };
    default:
      return state;
  }
};
