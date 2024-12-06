import { admin } from "../../client";
import { FortnightlyPayment } from "../../typings/FortnightlyPayments/fortnightlyPayment";

interface FortnightlyPaymentSuccessResponse {
  data: FortnightlyPaymentData;
}

export type FortnightlyPaymentData = {
  fortnightlyPayments: FortnightlyPayment[];
  success: true;
};

export type FortnightlyPaymentError = {
  message: string;
  success: false;
};

export type AdminGetAllFortnightlyPaymentsReturn =
  | FortnightlyPaymentData
  | FortnightlyPaymentError;

export const adminGetAllFortnightlyPayments =
  async (): Promise<AdminGetAllFortnightlyPaymentsReturn> => {
    try {
      const { data }: FortnightlyPaymentSuccessResponse = await admin.get(
        "/fortnightly-payment-list"
      );
      return data;
    } catch (err: any) {
      return {
        success: false,
        message: err.response.data.message || "Can't Get Fortnightly Payments",
      };
    }
  };
