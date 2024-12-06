import { Avatar, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import React from "react";
import { Instructor } from "../../typings/instructorTypings";

interface Props {
  item: Instructor;
}
const InstructorDetailCard = ({ item }: Props) => {
  console.log(item, "instructor item");
  return (
    <Box
      sx={{
        minWidth: 275,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {item.avater && (
        <Avatar
          alt={item.firstName}
          src={item?.avater}
          sx={{ width: 150, height: 150 }}
        />
      )}
      <CardContent>
        <Typography variant="h5" component="div">
          {item.firstName} {item.lastName}
        </Typography>
        <Box
          sx={{ display: "flex", flexDirection: "column", mt: 2, gap: "5px" }}
        >
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Email : {item.email}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Phone : {item.phone}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Date Of Birth : {moment(item.dateOfBirth).calendar()}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Gender : {item.gender}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Transmission Type : {item.transmissionType}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Withdraw Credit : {item.credit}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Car Name : {item.car.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Car Number : {item.car.numberPlate}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Car Transmission Type : {item.car.transmissionType}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            GST : {item.hasGst ? "Yes" : "No"}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Driving License Expire :{" "}
            {moment(item?.drivingLicenseExpire).format("MMM DD YYYY")}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Instructor License Expire :{" "}
            {moment(item?.instructorLicenseExpire).format("MMM DD YYYY")}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Children Check License Expire :{" "}
            {moment(item?.childrenCheckLicenseExpire).format("MMM DD YYYY")}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            ABN Number : {item.abnNumber}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Invoice Address : {item.invoiceAddress}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            BSB Number : {item.bsbNumber}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Bank Account Number : {item.bankAccountNumber}
          </Typography>

          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Language :
            {item.languages.map((language) => (
              <> {language}</>
            ))}
          </Typography>

          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Bio : {item.bio}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Suburbs :{" "}
            {item.serviceSuburbs?.suburbs.map((suburb) => {
              console.log(suburb, "suburb...");
              return <>{suburb?.name + "," + "\n"}</>;
            })}
          </Typography>
        </Box>
      </CardContent>
    </Box>
  );
};

export default InstructorDetailCard;
