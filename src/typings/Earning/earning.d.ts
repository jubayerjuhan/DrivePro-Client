export interface EarningType {
  _id: string;
  bookingId: string;
  bookingType: string;
  learner: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  instructor: {
    _id: string;
    firstName: string;
    lastName: string;
    avater: string;
  };
  duration: number;
  bookingAmount: number;
  unitPrice: number;
  total: number;
  managementFee: number;
  inclusiveGst: number;
  gst: number;
  subtotal: number;
  paid: boolean;
  invoice: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
