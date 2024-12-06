import { Earning } from "../Earnings/earningsTypes";

export interface SummaryTableColumnsType {
  fields: string[];
  datas: Earning[];
  warningMessage: string;
}
