import { Avatar, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import React from "react";
import { User } from "../../typings/reduxTypings";

interface Props {
  item: User;
}
const UserDetailCard = ({ item }: Props) => {
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
            User Id : {item._id}
          </Typography>
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
            License Status : {item.licenseStatus}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Available Credit : {item.credit}
          </Typography>
        </Box>
      </CardContent>
    </Box>
  );
};

export default UserDetailCard;
