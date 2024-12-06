import { Instructor } from "../instructorTypings";

export interface FortnightlyPayment {
  bookingAmount: number;
  gst: number;
  inclusiveGst: number;
  instructor: Instructor;
  invoice: string;
  managementFee: number;
  subtotal: number;
  total: number;
  __v: number;
  _id: string;
}
