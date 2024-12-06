import moment from "moment";
import React, { useEffect, useState } from "react";
import { client } from "../client";
import "./AgreementForm.scss";

const AgreementForm = ({
  children,
  date,
  address,
  instructorName,
  email,
  phone,
}: any) => {
  const [agreement, setAgreement] = useState("");
  useEffect(() => {
    client.get("/agreement/get-agreement").then((res) => {
      console.log(res.data.agreement.agreement);
      setAgreement(res.data.agreement.agreement);
    });
  }, []);

  return (
    <div className="agreement__form">
      <h1 className="title">Instructor Agreement</h1>
      <div className="agreement__contents">
        <p className="subtitle content">
          This Agreement has made on {moment(date).format("LLL")}
        </p>
        <p className="content">
          Between My Instructor PTY LTD, Australian Company Number 662 394 041 ,
          ABN is 39662394041.
          <br />
          <br />
          Located at 4 Mecca Court,Tarneit VIC 3029, Australia (herein represent
          after 1st party) and, <span>{instructorName} </span> a Driving
          Instructor residing at <span>{address}</span> , Email:{" "}
          <span>{email}</span> , Phone number <span> {phone} </span>(hereinafter
          2nd Party)
        </p>

        {/* agreement from server */}
        <div
          style={{ marginTop: "50px" }}
          dangerouslySetInnerHTML={{ __html: agreement }}
        />

        {/* agreement footer info */}
        <p className="content footer">
          On behalf of : <br />
          1st Party : <br />
          My Instructor PTY LTD <br />
          4 Mecca CCT ,VIC 3029,Australia. <br />
          Date : 21/12/2022 <br />
          <br />
          2nd Party : <br />
          Name: {instructorName} <br />
          Designation : Driving Instructor
          <br />
          Date : {moment(date).format("LLL")}
        </p>
      </div>
    </div>
  );
};

export default AgreementForm;
