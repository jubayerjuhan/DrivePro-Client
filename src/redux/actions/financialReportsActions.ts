import { client } from "../../client";
import { FortnightlyPayment } from "../../typings/reduxTypings";
import { GET_REPORTS_ERROR, GET_REPORTS_PENDING, GET_REPORTS_SUCCESS } from "../reducer/reduxNamings";
import { Period } from "./../../pages/FinancialReporting/FinancialReporting";
import { Dispatch } from "redux";

type FinancialReportSuccess = {
  data: {
    success: true;
    fortnightlyPayments: {
      totalAmout: number;
      reports: FortnightlyPayment[];
    };
  };
};

const fetchFinancialReports = (period?: Period) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: GET_REPORTS_PENDING });
    const { data }: FinancialReportSuccess = await client.post("fortnightly-payment/financial-reporting", period);
    if (data.success) dispatch({ type: GET_REPORTS_SUCCESS, payload: data.fortnightlyPayments });
  } catch (error: any) {
    dispatch({ type: GET_REPORTS_ERROR, payload: error.response.data.message });
  }
};

export { fetchFinancialReports };
