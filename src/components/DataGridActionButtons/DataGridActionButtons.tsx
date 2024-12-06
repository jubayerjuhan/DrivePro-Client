import React, { useState } from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box } from "@mui/system";
import { GridRowId } from "@mui/x-data-grid";
import AdminListEdit from "../AdminListEdit/AdminListEdit";

interface Props {
  id: GridRowId;
  type?: string;
}
const DataGridActionButtons = ({ id, type }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <Button
        startIcon={<EditIcon />}
        sx={{ marginRight: 3 }}
        onClick={() => setOpen(true)}
      />
      <Button
        startIcon={<DeleteIcon />}
        color="error"
        onClick={() => setOpen(false)}
      />
    </Box>
  );
};

export default DataGridActionButtons;
