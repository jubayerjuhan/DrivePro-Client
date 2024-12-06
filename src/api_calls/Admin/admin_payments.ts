import { admin } from "../../client";

interface InstructorPaymentListType {
  data: InstructorPaymentListSuccess;
}

export interface InstructorPaymentListSuccess {
  instructors: UnpaidInstructorType[];
  success: boolean;
}
type InstructorPaymentListError = {
  message: string;
  success: false;
};

export type GetInstructorPaymentListType =
  | InstructorPaymentListSuccess
  | InstructorPaymentListError;

export interface UnpaidInstructorType {
  amount: number;
  firstName: string;
  lastName: string;
  email: string;
  _id: string;
}

export const getInstructorPaymentList =
  async (): Promise<GetInstructorPaymentListType> => {
    try {
      const { data }: InstructorPaymentListType = await admin.get(
        "/earning/instructor-list"
      );
      return data;
    } catch (error) {
      return {
        success: false,
        message: "Can't Get Instructor Fortnight Payment List",
      };
    }
  };
