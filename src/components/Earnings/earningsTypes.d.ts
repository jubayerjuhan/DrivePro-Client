export interface InstructorEarningTableFields {
  fields: string[];
}

export interface Earning {
  bookingAmount: number;
  createdAt: string;
  duration: number;
  gst: number;
  inclusiveGst: number;
  instructor: string;
  invoice: string;
  learner: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  managementFee: number;
  subtotal: number;
  total: number;
  unitPrice: number;
  updatedAt: string;
  paid: boolean;
  __v: number;
  _id: string;
}
