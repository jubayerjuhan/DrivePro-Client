import { PromiseReducerState } from "./reduxTypings.d";
import { BookingTypeBack } from "./bookingsType";
import { BillingInfo, Cart } from "./cartTypings";
import { Car, Instructor, Suburb } from "./instructorTypings";

export interface State {
  user: UserState;
  admin: {
    admin: {
      _id: string;
      name: string;
      email: string;
    };
  };
  cart: {
    cart: Cart;
    billingInfo: BillingInfo;
  };
  instructor: {
    instructor: Instructor;
  };
  credit: CreditReducerTypes;
  booking: BookingReducerTypes;
  activeBooking: {
    booking: BookingTypeBack;
  };
  adminData: AdminDataReducerType;
  lessonPrice: {
    price: PriceReducerPrpos;
  };
  adminSuburbs: {
    loading: boolean;
    error: string;
    suburbs: Suburb[];
  };
  car: Car;
  suburb: { suburb: Suburb };
  sendPromise: PromiseReducerState;
  financialReports: FinancialReportsReducer;
}

export interface PriceReducerPrpos {
  insidePrice: number;
  outsidePrice: number;
  testPrice: number;
}
export interface BookingReducerTypes {
  loading: boolean;
  success: boolean;
  error: string;
  booking: BookingType;
  pickupDetails: PickupDetails;
}

export interface BookingType {
  duration: number;
  date: string;
  type?: string;
  instructor: Instructor;
  time: { startFrom?: string; endTo?: string; from?: string; to?: string };
}

export interface PickupDetails {
  address: string;
  suburb: string;
  postCode: string;
  state: string;
}
export interface UserState {
  loading: boolean;
  error: string;
  user: User;
}

export interface CreditReducerTypes {
  loading: boolean;
  error: string;
  success: boolean;
}

export interface User {
  _id: string;
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  licenseStatus: string;
  credit: number;
  userType: string;
  avater?: string;
  bio?: string;
  available?: boolean;
  car?: Car;
  accessability?: boolean;
}

interface AdminDataReducerType {
  instructors: {
    loading: boolean;
    error: string;
    instructors: Instructor[];
    success: boolean;
  };
  users: {
    success: boolean;
    loading: boolean;
    error: string;
    users: User[];
  };
  bookings: {
    success: boolean;
    loading: boolean;
    error: string;
    bookings: BookingTypeBack[];
  };
}

export type Conversation = User;

export interface Message {
  from: string;
  to: string;
  text: string;
  _id: string;
  messageType: string;
  fileName: string;
}

// initial promise state

export type PromiseReducerState = {
  loading: boolean;
  success?: boolean;
  error?: string;
  message?: string;
};

export interface FortnightlyPayment {
  _id: string;
  bookingAmount: number;
  total: number;
  subtotal: number;
  managementFee: number;
  gst: number;
  inclusiveGst: number;
  instructor: Instructor;
  invoice: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface FinancialReportsReducer {
  loading: boolean;
  error?: string;
  reports: FortnightlyPayment[];
  totalAmount: number;
}
