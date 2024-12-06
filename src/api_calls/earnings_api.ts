import { Earning } from "../components/Earnings/earningsTypes";
import { client } from "../client";

/**
 * Retrieves all earnings for a given instructor from the server.
 * @async
 * @function getAllEarnings
 * @returns {Promise<InstructorEarningsReturn>} A Promise that resolves to an object containing a boolean indicating the success status, and either an array of earnings objects or an error message.
 * @throws {Error<Object>} If the request to the server fails.
 */
export interface InstructorEarningsReturn {
  success: boolean;
  earnings?: Earning[];
  error?: string;
}

export const getInstructorEarnings =
  async (): Promise<InstructorEarningsReturn> => {
    try {
      const { data } = await client.get(`earning/list`);
      return {
        success: true,
        earnings: data?.earnings ?? [],
      };
    } catch (error) {
      return {
        success: false,
        error: "Can't Get The Earnings",
      };
    }
  };

interface InsAvailablePayoutServerResponse {
  data: {
    amount: number;
    success: boolean;
  };
}

export type ErrorResponse = {
  success: boolean;
  error: string;
};

export type InstructorAvailablePayoutAmount = number | ErrorResponse;

/**
 * Retrieves the available payout amount for the current instructor from the API.
 * @returns {Promise<number | ErrorResponse>} A Promise that resolves with the available payout amount as a number,
 * or an ErrorResponse object if the API call fails.
 * @throws Throws an error if the API call fails and an error cannot be constructed into an ErrorResponse object.
 */

export const getInstructorAvailablePayoutAmount =
  async (): Promise<InstructorAvailablePayoutAmount> => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data }: InsAvailablePayoutServerResponse = await client.get(
          `earning/amount`
        );
        resolve(data.amount);
      } catch (error) {
        const errorResponse: ErrorResponse = {
          success: false,
          error: "Can't Get Instructor Available Payout Amount",
        };
        reject(errorResponse);
      }
    });
  };
