import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import { Button } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useDispatch, useSelector } from "react-redux";

import DatePickerComponent from "../../components/PickDate/PickDate";
import { fetchFinancialReports } from "../../redux/actions/financialReportsActions";
import "./FinancialReporting.scss";
import { State } from "../../typings/reduxTypings";
import { financialReportingColumn } from "./financialReportingData";
import { toast } from "material-react-toastify";
import { CLEAR_ERROR } from "../../redux/reducer/reduxNamings";

export interface Period {
  from?: Date;
  to?: Date;
}
const FinancialReporting = () => {
  const { loading, reports, totalAmount, error } = useSelector((state: State) => state.financialReports);
  const dispatch: any = useDispatch();
  const [period, setPeriod] = useState<Period>();

  const handleChange = (fieldName: string, value: any) => {
    setPeriod({ ...period, [fieldName]: value });
  };

  console.log(period);
  useEffect(() => {
    dispatch(fetchFinancialReports());
  }, [dispatch]);

  if (error) {
    toast.error(error);
    dispatch({ type: CLEAR_ERROR });
  }

  // generate rows here
  const rows: any = [];
  reports.forEach((report, index) => {
    rows.push({
      ...report,
      id: index + 1,
      createdAt: moment(report.createdAt).format("LL"),
    });
  });

  // filtering with date
  const handleFilter = () => {
    dispatch(fetchFinancialReports(period));
  };

  return (
    <div className="financial__reports">
      <h4 className="header">Financial Reports</h4>
      <p className="description">Select a start and end date to view financial reports between the chosen period.</p>
      <div className="date__selector">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePickerComponent title="From" onChange={(value) => handleChange("from", value)} />
          <DatePickerComponent title="To" onChange={(value) => handleChange("to", value)} />
        </LocalizationProvider>
        {period?.from && period.to && (
          <Button variant="contained" onClick={handleFilter}>
            Filter
          </Button>
        )}
      </div>
      <p className="totalEarning">Total Earning : ৳{totalAmount}</p>
      <div className="mui__datagrid">
        <DataGrid
          rows={rows}
          columns={financialReportingColumn}
          sx={{ height: "80vh", backgroundColor: "white", mt: 3 }}
        />
      </div>
    </div>
  );
};

export default FinancialReporting;
