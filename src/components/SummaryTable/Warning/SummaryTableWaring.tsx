import React from "react";

interface SummaryTableWarningTypes {
  colspan: number;
  message: string;
}
const SummaryTableWarning = ({
  colspan,
  message,
}: SummaryTableWarningTypes) => {
  return (
    <tr>
      <td colSpan={colspan} style={{ textAlign: "center", padding: "20px" }}>
        {message}
      </td>
    </tr>
  );
};

export default SummaryTableWarning;
