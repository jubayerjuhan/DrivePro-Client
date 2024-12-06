import {
  Avatar,
  Button,
  Chip,
  CircularProgress,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { admin, client } from "../../client";
import { Applicant } from "../../typings/instructorTypings";
import AdminPageWrapper from "../AdminPageWrapper/AdminPageWrapper";
import "./AdminInstructorApplication.scss";

const AdminInstructorApplication = () => {
  const [application, setApplication] = useState<Applicant>();
  const { id } = useParams();

  useEffect(() => {
    fetchApplicationData();
  }, []);

  const fetchApplicationData = async () => {
    const { data } = await admin.get(`/instructor-application/${id}`);
    setApplication(data?.applicant);
  };

  console.log(application, "application");
  if (!application)
    return (
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  return (
    <AdminPageWrapper>
      <div className="instructor__applicant-wrapper">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar
            alt={application?.firstName}
            src={application?.avater}
            sx={{ width: 250, height: 250 }}
          />
          <a
            style={{ textAlign: "center", marginTop: "10px" }}
            href={application?.avater}
            download
            target={"_blank"}
            rel="noreferrer"
          >
            Download Image
          </a>
        </Box>

        <Typography>Application ID : {application._id} </Typography>
        <Typography>First Name : {application.firstName} </Typography>
        <Typography>Last Name : {application.lastName} </Typography>
        <Typography>
          Date Of Birth: {moment(application.dateOfBirth).format("LL")}{" "}
        </Typography>
        <Typography>Gender: {application.gender} </Typography>
        <Typography>Email : {application.email} </Typography>
        <Typography>Phone : {application.phone} </Typography>
        <Typography>Address: {application.address} </Typography>
        <Typography>
          ABN Number:{" "}
          {application.abnNumber
            ? application.abnNumber
            : "ABN No Not Provided"}{" "}
        </Typography>
        <Typography>
          Bank Account Number: {application.accountNumber}{" "}
        </Typography>
        <Typography>BSB Number: {application.bsbNumber} </Typography>
        <Typography>Car: {application.car} </Typography>
        <Typography>
          Children Check License Expire:{" "}
          {moment(application.childrenCheckLicenseExpire).format("LL")}{" "}
        </Typography>
        <Typography>
          Instructor License Expire:{" "}
          {moment(application.instructorLicenseExpire).format("LL")}{" "}
        </Typography>
        <Typography>
          Driving License Expire:{" "}
          {moment(application.drivingLicenseExpire).format("LL")}{" "}
        </Typography>
        <Typography>
          Transmission Type: {application.transmissionType}{" "}
        </Typography>
        <Typography>
          Languages:{" "}
          {application.languages.map((language: any, key) => (
            <>{language.name} </>
          ))}{" "}
        </Typography>
        <Typography>
          Service Suburbs :{" "}
          {application.serviceSuburbs.map((suburb) => (
            <Chip
              label={suburb.suburb}
              variant="outlined"
              sx={{ marginRight: 1 }}
            />
          ))}
        </Typography>
        <Typography>Message : {application.message}</Typography>
        <Typography>Signature :</Typography>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <img
            src={application.signature}
            alt=""
            style={{ objectFit: "contain", width: "200px" }}
          />
          <a
            href={application?.signature}
            download
            target={"_blank"}
            rel="noreferrer"
          >
            <Button sx={{ mt: 1, width: "20%" }}>Download Image</Button>
          </a>
        </div>
        <Typography>License Photos :</Typography>
        <Box sx={{ display: "flex", gap: 3, flexDirection: "column" }}>
          {application.licensePhotos?.map((photo, key) => (
            <>
              <img
                key={key}
                src={photo}
                alt={"License Pic"}
                style={{
                  objectFit: "contain",
                  width: "250px",
                  borderRadius: 4,
                }}
              />
              <a href={photo} download target={"_blank"} rel="noreferrer">
                <Button sx={{ mt: 1, width: "20%" }}>Download Image</Button>
              </a>
            </>
          ))}
        </Box>
      </div>
    </AdminPageWrapper>
  );
};

export default AdminInstructorApplication;
