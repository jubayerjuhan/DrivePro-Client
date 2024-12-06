import { Box, CardContent, Typography } from "@mui/material";
import moment from "moment";
import React, { useEffect } from "react";
import { BookingTypeBack } from "../../typings/bookingsType";

interface Props {
  item: BookingTypeBack;
}
const BookingsDetailCard = ({ item }: Props) => {
  console.log(item, "item...");

  const [matchedSuburb, setMatchedSuburb] = React.useState<any>();

  useEffect(() => {
    item.instructor.serviceSuburbs.suburbs.map((suburb: any) => {
      console.log(suburb);
      if (suburb._id === item.pickupDetails.suburb) {
        setMatchedSuburb(suburb.name);
      }
    });
  }, [item]);

  return (
    <Box
      sx={{
        minWidth: 275,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", flexDirection: "column", mt: 2, gap: "5px" }}>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Reviewed : {item.reviewed ? "Yes" : "No"}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Booked By : {item.user?.firstName} {item.user?.lastName} ({item.user?._id})
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Instructor : {item.instructor?.firstName} {item.instructor?.lastName} ({item.instructor?._id})
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Duration : {item.duration}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Starts From : {moment(item.time.from).format("LLL")}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            End To : {moment(item.time.to).format("LLL")}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Status : {item.status}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.primary">
            Pickup Details
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.primary">
            Address : {item.pickupDetails.address}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.primary">
            Suburb : {matchedSuburb}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.primary">
            Postcode : {item.pickupDetails.postcode}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.primary">
            State : {item.pickupDetails.state}
          </Typography>
          {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
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
            Bio : {item.bio}
          </Typography> */}
        </Box>
      </CardContent>
    </Box>
  );
};

export default BookingsDetailCard;
