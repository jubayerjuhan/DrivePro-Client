import React from "react";

const additionalInfo = ["abnNumber", "invoiceAddress"];
const paymentInfo = ["bankAccountNumber", "bsbNumber"];

export const handleInstructorEdit = (
  edits: any,
  setEdits: any,
  e: React.ChangeEvent<HTMLInputElement>,
  item: any
) => {
  console.log(item, "item instructor edit");
  if (paymentInfo.includes(e.target.name)) {
    console.log(e.target.name);
    setEdits({
      ...edits,
      paymentInfo: {
        bankAccountNumber:
          e.target.name === "bankAccountNumber"
            ? Number(e.target.value)
            : Number(item.paymentInfo.bankAccountNumber),
        bsbNumber:
          e.target.name === "bsbNumber"
            ? Number(e.target.value)
            : Number(item.paymentInfo.bsbNumber),
      },
    });
  }

  if (additionalInfo.includes(e.target.name))
    return setEdits({
      ...edits,
      additionalInfo: {
        ...item.additionalInfo,
        [e.target.name]:
          e.target.name === "abnNumber"
            ? Number(e.target.value)
            : e.target.value,
      },
    });
  setEdits({ ...edits, [e.target.name]: e.target.value });
};
