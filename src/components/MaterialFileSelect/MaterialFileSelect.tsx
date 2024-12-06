import * as React from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";

export default function MaterialFileSelect({
  title,
  label,
  placeholder,
  handleFileChange,
  ...otherProps
}: any) {
  const [selectedFile, setSelectedFile] = React.useState<any>();

  console.log(selectedFile, "selected file...");
  return (
    <div className="material__file-select">
      <Typography sx={{ mb: 1 }}>{label + " *"}</Typography>
      <Typography sx={{ mb: 1, color: "GrayText" }}>{placeholder}</Typography>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Button
          variant="contained"
          component="label"
          style={{ backgroundColor: "#faa41a", color: "black" }}
        >
          {title}
          <input
            {...otherProps}
            hidden
            accept="image/*"
            multiple
            type="file"
            onChange={handleFileChange}
          />
        </Button>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
          style={{ backgroundColor: "#faa41a", color: "white" }}
        >
          <input
            hidden
            {...otherProps}
            accept="image/*"
            type="file"
            onChange={handleFileChange}
          />
          <PhotoCamera />
        </IconButton>
      </Stack>
    </div>
  );
}
