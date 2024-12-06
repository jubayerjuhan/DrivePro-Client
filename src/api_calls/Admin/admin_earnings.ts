import { admin } from "../../client";
import { EarningType } from "../../typings/Earning/earning";

type AllInstructorEarningsResponse = {
  data: {
    success: boolean;
    earnings: EarningType[];
  };
};

type FetchInstructorEarningsResponse = {
  success: true;
  earnings: EarningType[];
};
type FetchInstructorEarningsError = { success: false; message: string };

export type FetchInstructorEarningsTypings =
  | FetchInstructorEarningsResponse
  | FetchInstructorEarningsError;

export const fetchAllInstructorEarnings =
  async (): Promise<FetchInstructorEarningsTypings> => {
    try {
      const { data }: AllInstructorEarningsResponse = await admin.get(
        "earning/list"
      );

      return { earnings: data.earnings, success: true };
    } catch (error) {
      return {
        success: false,
        message: "Can't Fetch All Instructor Earnings",
      };
    }
  };
