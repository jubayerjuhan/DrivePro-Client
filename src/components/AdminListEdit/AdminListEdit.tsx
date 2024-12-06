import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Modal,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import {
  bookingsField,
  instructorInput,
  registerFields,
} from "../Register/registerInputs";
import "./AdminListEdit.scss";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

import Select, { SelectChangeEvent } from "@mui/material/Select";
import { adminEditUser } from "../../api_calls/Admin/admin_userapi";
import { toast } from "material-react-toastify";
import { adminEditInstructor } from "../../api_calls/Admin/admin_instructors";
import { adminEditBooking } from "../../api_calls/Admin/admin_booking";
import { Suburb } from "../../typings/instructorTypings";
import { client } from "../../client";
import { handleInstructorEdit } from "./instructorEdit";

interface Props {
  visible: boolean;
  setEditVisible: any;
  type: String;
  item: any;
}

const AdminListEdit = ({ item, type, visible, setEditVisible }: Props) => {
  console.log(item, "item..");
  const [suburbs, setSuburbs] = useState<Suburb[]>([]);
  const [loading, setLoading] = useState(false);
  const [editedSuburbs, setEditedSuburbs] = useState<any>({ suburbs: [] });
  const [edits, setEdits] = useState({});
  const fields = {
    user: registerFields,
    instructor: instructorInput,
    booking: bookingsField,
  };

  const editFunc = {
    user: adminEditUser,
    instructor: adminEditInstructor,
    booking: adminEditBooking,
  };

  const handleChange = (e: any) => {
    setEdits({ ...edits, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // return console.log(edits, "edits");
    const { success, message } = await editFunc[type as keyof typeof editFunc](
      item._id,
      edits,
      editedSuburbs,
      item
    );
    if (!success) return toast.error(message);
    toast.success("Edited Successfully");
    setEditVisible(false);
  };

  // handle suburb serarch
  const handleSubrubSearch = async (e: any) => {
    if (e.target.value.length === 0) setSuburbs([]);
    if (e.target.value.length < 2) return;
    setLoading(true);
    const { data } = await client.get(`/search-suburbs/${e.target.value}`);
    setLoading(false);
    setSuburbs(data.suburbs);
  };

  console.info(edits, "edits");
  if (!item || !type) return <></>;

  console.log(editedSuburbs, "suburbs...");

  return (
    <Modal
      open={visible}
      onClose={() => setEditVisible(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        overflow: "scroll",
      }}
    >
      <Box className={"modal__fields-wrapper"}>
        <CloseIcon
          className={"close__icon"}
          onClick={() => setEditVisible(false)}
        />
        <Typography id="modal-modal-title" variant="h5" component="h2">
          Edit
        </Typography>

        <Box className={"model__fields"}>
          {fields[type as keyof typeof fields].map((field, key) => {
            if (field.name === "password") return <></>;
            if (field.type === "radio")
              return (
                <Box
                  className="hasgst__field"
                  sx={{ display: "flex", gap: 2, alignItems: "center" }}
                >
                  <p>{field.label}</p>
                  <Checkbox
                    defaultChecked={item[field.name]}
                    onChange={(e) =>
                      setEdits({ ...edits, [field.name]: e.target.checked })
                    }
                  />
                </Box>
              );
            if (field.type === "select")
              return (
                <>
                  <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    {field.label}
                  </InputLabel>
                  <Select
                    name={field.name}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue={item[field?.name]}
                    onChange={handleChange}
                  >
                    {field?.options &&
                      field.options.map((option, key) => (
                        <MenuItem value={option} key={key}>
                          {option}
                        </MenuItem>
                      ))}
                  </Select>
                </>
              );

            // if the field is suburbs then render this
            if (field.name === "suburbs")
              return (
                <Autocomplete
                  multiple
                  loading={loading}
                  onChange={(e, value) =>
                    setEditedSuburbs({ ...editedSuburbs, suburbs: value })
                  }
                  id="tags-standard"
                  options={suburbs}
                  getOptionLabel={(option: any) =>
                    option.suburb ? option.suburb : ""
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      onChange={handleSubrubSearch}
                      variant="outlined"
                      label={field.label}
                      placeholder="Suburb"
                    />
                  )}
                />
              );
            return (
              <Box>
                {field.type === "date" && (
                  <Typography sx={{ mb: 2 }}>
                    Current: {moment(item[field?.name]).calendar()}
                  </Typography>
                )}
                <TextField
                  key={key}
                  id="outlined-basic"
                  onChange={handleChange}
                  name={field?.name}
                  defaultValue={
                    field?.type !== "date"
                      ? item[field?.name]
                      : moment(item[field?.name]).calendar()
                  }
                  InputLabelProps={{ shrink: true }}
                  label={field.label}
                  variant="outlined"
                  type={field.type}
                  sx={{ width: "100%" }}
                />
              </Box>
            );
          })}
        </Box>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ mt: 3, width: "100%" }}
        >
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default AdminListEdit;
