import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  deleteUserAdmin,
  getSingleBookingAdmin,
  getSingleInstructorAdmin,
  getSingleUserAdmin,
} from "../api_calls/Admin/admin_userapi";
import AdminPageWrapper from "../components/AdminPageWrapper/AdminPageWrapper";
import "./view__items-page.scss";
import UserDetailCard from "../components/UserDetailCard/UserDetailCard";
import InstructorDetailCard from "../components/InstructorDetailCard/InstructorDetailCard";
import BookingsDetailCard from "../components/BookingsDetailCard/BookingsDetailCard";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import AdminListEdit from "../components/AdminListEdit/AdminListEdit";
import HelmetTitle from "../components/HelmetTitle/HelmetTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteInstructorAdmin } from "../api_calls/Admin/admin_instructors";
import { toast } from "material-react-toastify";

interface Props {
  type: string;
}
const ViewItemsPage = ({ type }: Props) => {
  const [editVisible, setEditVisible] = useState(false);
  const [item, setItem] = useState<any>();
  const { id } = useParams();

  const getItem = {
    user: getSingleUserAdmin,
    instructor: getSingleInstructorAdmin,
    booking: getSingleBookingAdmin,
  };

  const ShowItem = {
    user: <UserDetailCard item={item} />,
    instructor: <InstructorDetailCard item={item} />,
    booking: <BookingsDetailCard item={item} />,
  };

  const deleteMethods = {
    user: deleteUserAdmin,
    instructor: deleteInstructorAdmin,
    booking: () => {},
  };

  useEffect(() => {
    getDatas();
  }, [editVisible]);

  const getDatas = async () => {
    const data = await getItem[type as keyof typeof getItem](id);
    setItem(data[type]);
  };
  // delete item
  const deleteItem = async () => {
    const data = await deleteMethods[type as keyof typeof deleteMethods](id);
    if (!data?.success) return toast.error(data?.message);
    toast.success(`${type} deleted successfully`);
  };

  return (
    <>
      <HelmetTitle
        title={`View ${type.charAt(0).toUpperCase() + type.slice(1)}`}
      />

      <AdminListEdit
        item={item}
        type={type}
        visible={editVisible}
        setEditVisible={setEditVisible}
      />
      <AdminPageWrapper>
        <div className="view__items-page">
          {!item ? (
            <p>Loading...</p>
          ) : (
            <div className="user__info">
              {ShowItem[type as keyof typeof ShowItem]}
            </div>
          )}
        </div>
        <Fab
          variant="extended"
          color={"primary"}
          onClick={() => setEditVisible(true)}
        >
          <EditIcon sx={{ mr: 1 }} />
          Edit
        </Fab>
        {type !== "booking" && (
          <Fab
            variant="extended"
            color={"error"}
            sx={{ marginLeft: 2 }}
            onClick={deleteItem}
          >
            <DeleteIcon sx={{ mr: 1 }} />
            Delete
          </Fab>
        )}
      </AdminPageWrapper>
    </>
  );
};

export default ViewItemsPage;
