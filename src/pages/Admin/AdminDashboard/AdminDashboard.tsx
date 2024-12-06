import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllBookings,
  getAllInstructors,
  getAllSuburbs,
  getAllUsers,
  setPriceAdmin,
} from "../../../api_calls/admin_api";
import AdminPageWrapper from "../../../components/AdminPageWrapper/AdminPageWrapper";
import DashboardInfoCard from "../../../components/Dashboard_Infocard/Dashboard_Infocard";
import { State, User } from "../../../typings/reduxTypings";
import "./AdminDashboard.scss";
import { Button } from "@mui/material";
import { toast } from "material-react-toastify";
import { SET_LESSON_PRICE } from "../../../redux/reducer/reduxNamings";
import HelmetTitle from "../../../components/HelmetTitle/HelmetTitle";

const AdminDashboard = () => {
  const priceFields = [
    { name: "testPrice", label: "Test Package Price" },
    { name: "outsidePrice", label: "Gift Card Price" },
  ];
  const dispatch = useDispatch<any>();
  const { price } = useSelector((state: State) => state.lessonPrice);
  const [lessonPrice, setLessonPrice] = useState(price);
  const {
    loading: bookLoading,
    bookings,
    error: bookingsError,
  } = useSelector((state: State) => state.adminData.bookings);

  const {
    loading: instructorLoading,
    instructors,
    error: instructorsError,
  } = useSelector((state: State) => state.adminData.instructors);

  const {
    loading: usersLoading,
    users,
    error: usersError,
  } = useSelector((state: State) => state.adminData.users);

  useEffect(() => {
    getAdminDatas();
  }, []);

  const getAdminDatas = async () => {
    dispatch(getAllUsers());
    dispatch(getAllInstructors());
    dispatch(getAllBookings());
    dispatch(getAllSuburbs());
  };

  const rows: User[] = [];
  users?.forEach((user) => {
    user.id = user._id;
    rows.push(user);
  });

  console.log(lessonPrice);
  const setPrice = async () => {
    const data = await setPriceAdmin(lessonPrice);

    if (!data.success)
      return toast.error(
        "There Was Problem Setting Price Check Twice If The Value Smaller Than 0"
      );
    toast.success("New Price Set Successfull");
    dispatch({ type: SET_LESSON_PRICE, payload: data.price });
  };
  return (
    <AdminPageWrapper>
      <HelmetTitle title={`Admin Dashboard - My Instructor`} />

      <div className="dashboard__quick-info">
        <DashboardInfoCard
          title={"Users"}
          count={users?.length}
          loading={usersLoading}
        />
        <DashboardInfoCard
          title={"Instructors"}
          count={instructors?.length}
          loading={instructorLoading}
        />
        <DashboardInfoCard
          title={"Bookings"}
          count={bookings?.length}
          loading={bookLoading}
        />
      </div>
      <div className="dashboard__table">
        <form
          action=""
          style={{ marginTop: 20, display: "flex", gap: 20, flexWrap: "wrap" }}
        >
          {priceFields.map((field, key) => {
            return (
              <TextField
                id="outlined-basic"
                label={field.label}
                name={field.name}
                type={"number"}
                onChange={(e) =>
                  setLessonPrice({
                    ...lessonPrice,
                    [e.target.name]: parseFloat(e.target.value),
                  })
                }
                variant="outlined"
                defaultValue={price[field.name as keyof typeof price]}
              />
            );
          })}
          <Button variant="contained" onClick={setPrice}>
            Set Price
          </Button>
        </form>
      </div>
    </AdminPageWrapper>
  );
};

export default AdminDashboard;
