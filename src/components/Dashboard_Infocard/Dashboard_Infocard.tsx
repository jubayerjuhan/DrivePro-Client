import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

interface Props {
  count: number;
  title: string;
  loading: boolean;
}

export default function DashboardInfoCard({ title, count, loading }: Props) {
  return (
    <Card sx={{ width: 220 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {title}
        </Typography>
        {loading ? (
          <Skeleton variant="rectangular" width={30} height={30} />
        ) : (
          <Typography variant="h5" component="div">
            {count}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button size="small">Show All</Button>
      </CardActions>
    </Card>
  );
}
