import React from "react";
import SummaryTableWarning from "./Warning/SummaryTableWaring";
import { Button } from "@mui/material";
import "./summaryTable.scss";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { SummaryTableColumnsType } from "./summaryTableTypes";
import moment from "moment";

const SummaryTable = ({
  fields,
  datas,
  warningMessage,
}: SummaryTableColumnsType) => {
  return (
    <table>
      <thead>
        <tr>
          {fields.map((field, key) => (
            <th key={key}>{field}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {datas.map((data, key) => (
          <tr>
            <td>{data._id.substring(0, 10) + "..."}</td>
            <td>{moment(data.createdAt).format("DD-MM-YYYY")}</td>
            <td>
              {data.learner.firstName} {data.learner.lastName}
            </td>
            <td>{data.duration} hrs</td>
            <td>${data.subtotal}</td>
            <td>{data.paid ? "Yes" : "No"}</td>
            <td>
              <a href={data.invoice} target={"_blank"} rel="noreferrer">
                <Button
                  variant="outlined"
                  startIcon={<FaFileInvoiceDollar />}
                  color={"warning"}
                >
                  Invoice
                </Button>
              </a>
            </td>
          </tr>
        ))}
        {datas.length === 0 && (
          <SummaryTableWarning
            colspan={fields.length}
            message={warningMessage}
          />
        )}
      </tbody>
    </table>
  );
};

export default SummaryTable;
