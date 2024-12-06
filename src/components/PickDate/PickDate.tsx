import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface Props {
  title: string;
  onChange: (value: any) => any;
}
const PickDate = ({ title, onChange }: Props) => {
  return (
    <div>
      <DatePicker label={title} onChange={(val) => onChange(val)} />
    </div>
  );
};

export default PickDate;
