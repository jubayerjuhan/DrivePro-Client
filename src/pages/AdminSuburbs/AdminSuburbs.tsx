import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AdminPageWrapper from "../../components/AdminPageWrapper/AdminPageWrapper";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../typings/reduxTypings";
import { Suburb } from "../../typings/instructorTypings";
import { getAllSuburbs } from "../../api_calls/admin_api";
import { editSuburb } from "../../api_calls/Admin/suburb_api";
import { toast } from "material-react-toastify";
import HelmetTitle from "../../components/HelmetTitle/HelmetTitle";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  display: "flex",
  gap: 2,
  flexDirection: "column",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
const AdminSuburbs = () => {
  const [listedSuburbs, setListedSuburbs] = useState<Suburb[]>([]);
  const [openedSuburb, setOpenedSuburb] = useState("");
  const [price, setPrice] = useState<number>(0);
  const { suburbs, loading } = useSelector(
    (state: State) => state.adminSuburbs
  );
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getAllSuburbs());
  }, [dispatch]);
  useEffect(() => {
    const editedSuburbs: Suburb[] = [];
    suburbs?.forEach((suburb, key) => {
      suburb.id = suburb._id;
      editedSuburbs.push(suburb);
    });
    setListedSuburbs(editedSuburbs);
  }, [suburbs]);

  const suburbsColumns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1 },
    {
      field: "suburb",
      headerName: "Suburb",
      flex: 1,
    },
    {
      field: "state",
      headerName: "State",
      flex: 1,
    },

    {
      field: "postcode",
      headerName: "Post Code",
      flex: 1,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      type: "string",
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <Button onClick={() => setOpenedSuburb(params.id.toString())}>
          Edit
        </Button>
      ),
    },
  ];

  // edit price
  const editPrice = async () => {
    const data = await editSuburb(openedSuburb, price);
    if (!data.success) return toast.error(data.message);
    toast.success("Price Changed Successfully");
    return setOpenedSuburb("");
  };

  return (
    <AdminPageWrapper className={"dashbaord__content-wrapper"}>
      <HelmetTitle title={`Suburbs - Admin`} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p className="title">Suburbs</p>
      </Box>
      {loading && (
        <Typography sx={{ mb: 2 }}>
          Your Suburbs Are Still Loading, It May Take Some Time To Get Updated
          Suburbs List (If You Have Edited Something), Please Wait. You Won't
          See This Message Once We Got All Updated. Thank You
        </Typography>
      )}
      <DataGrid
        rows={listedSuburbs}
        columns={suburbsColumns}
        pageSize={10}
        disableSelectionOnClick
        sx={{ height: "80vh" }}
      />
      <Modal
        open={openedSuburb ? true : false}
        onClose={() => setOpenedSuburb("")}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            type={"number"}
            id="outlined-basic"
            label="Price"
            onChange={(e) => setPrice(parseInt(e.target.value))}
            variant="outlined"
          />
          <Button variant="contained" onClick={editPrice}>
            Submit
          </Button>
        </Box>
      </Modal>
    </AdminPageWrapper>
  );
};

export default AdminSuburbs;
