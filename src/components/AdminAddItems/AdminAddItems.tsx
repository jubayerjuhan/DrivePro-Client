import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { carFields } from "../../utils/InputFieldsDetail/InputFieldsDetail";
import { addCar } from "../../api_calls/Admin/admin_car";
import { toast } from "material-react-toastify";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface Props {
  open: any;
  handleOpen: any;
  type: string;
}
const AdminAddItems = ({ open, type, handleOpen }: Props) => {
  const [inputValues, setInputValues] = useState<any>({});
  const [loading, setLoading] = useState(false);
  let inputFields: any[] = [];

  if (type === "car") {
    inputFields = carFields;
  }

  console.log(inputValues);

  const handleFieldChange = (e: any) => {
    if (e.target.name === "avater") {
      return setInputValues({
        ...inputValues,
        [e.target.name]: e.target.files[0],
      });
    }
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  const ifhasImage = () => {
    const formData = new FormData();
    if (inputValues?.avater) {
      Object.keys(inputValues).forEach((key) => {
        formData.append(key, inputValues[key]);
      });
      return formData;
    } else {
      return inputValues;
    }
  };

  const handleSubmit = async () => {
    const values = ifhasImage();
    setLoading(true);
    const success = await addCar(values);

    if (!success) {
      setLoading(false);
      return toast.error("Can't Add Car");
    }

    setLoading(false);
    handleOpen(false);
    return toast.success("Car Added Successfully");
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={() => handleOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ outline: "none", border: "none" }}
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ marginBottom: "20px" }}
          >
            Add {type.toUpperCase()}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {inputFields.map((field, key) => (
              <>
                <input
                  onChange={handleFieldChange}
                  key={key}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  className="form-control input__element login"
                />
              </>
            ))}
          </Box>
          <Button
            variant="contained"
            disabled={loading}
            onClick={handleSubmit}
            sx={{ marginTop: "10px", width: "100%" }}
          >
            {loading ? "Loading..." : "Save Car"}
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default AdminAddItems;
