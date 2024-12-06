import React, { useEffect, useRef, useState } from "react";
import { AiOutlineCheck, AiOutlineEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { editUser, updateAvater } from "../../api_calls/user_api";
import Button from "../../components/core/Button/Button";
import { licenseStatusOptions } from "../../components/Register/registerInputs";
import { LEARNER_LOGIN_COMPLETE } from "../../redux/reducer/reduxNamings";
import { State, User } from "../../typings/reduxTypings";
import { toast } from "material-react-toastify";
import "./Profile.scss";
import Switch from "@mui/material/Switch";

import { changeAvailability, editInstructor, instructorUpdateAvater } from "../../api_calls/instructor_api";
import FullPageSpinner from "../../components/FullPageSpinner/FullPageSpinner";
import { Autocomplete, TextField } from "@mui/material";
import { getAllCars } from "../../api_calls/Admin/admin_car";
import { Car } from "../../typings/instructorTypings";
import { calculateAge } from "../../utils/age";

interface ProfileField {
  name: string;
  label: string;
  placeHolder: string;
  type: string;
  defaultValue: string;
  options?: string[];
}
const Profile = () => {
  const inputFile = useRef<any>(null);
  const [newProfileImage, setNewProfileImage] = useState({
    preview: "",
    upload: "",
  });
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state: State) => state.user);
  const [profile, setProfile] = useState<User>(user);
  const [cars, setCars] = useState<Car[]>([]);
  const [profileFields, setProfileFields] = useState<ProfileField[]>();
  const [editMode, setEditMode] = useState<boolean>(false);
  console.log(profile, "user... 44..");

  useEffect(() => {
    setProfileFields([
      {
        name: "age",
        label: "Age",
        placeHolder: "Your Age",
        type: "text",
        defaultValue: calculateAge(profile.dateOfBirth),
      },
      {
        name: "firstName",
        label: "First Name",
        placeHolder: "Your First Name",
        type: "text",
        defaultValue: profile.firstName,
      },
      {
        name: "lastName",
        label: "Last Name",
        placeHolder: "Your Last Name",
        type: "text",
        defaultValue: profile.lastName,
      },
      {
        name: "email",
        label: "Email",
        placeHolder: "Your Email",
        type: "text",
        defaultValue: profile.email,
      },
      {
        name: "phone",
        label: "Phone Number",
        placeHolder: "Your Phone Number",
        type: "number",
        defaultValue: profile.phone,
      },
      {
        name: "licenseStatus",
        label: "Liscense Status",
        placeHolder: "Your Liscense Status",
        type: "select",
        defaultValue: profile.licenseStatus,
        options: licenseStatusOptions,
      },
      {
        name: "bio",
        label: "Bio",
        placeHolder: "Your Bio",
        type: "textarea",
        defaultValue: profile.bio || "",
      },
      {
        name: "car",
        label: "Car",
        placeHolder: "Car",
        type: "searchAndSelect",
        defaultValue: "",
      },
    ]);
  }, [profile]);

  useEffect(() => {
    getCars();
  }, []);

  const getCars = async () => {
    const data = await getAllCars();
    setCars(data?.cars);
  };

  // handle edit click
  const handleEditClick = () => {
    toast.warn("Edit Mode Enabled, After Done Edit Press on Save Profile");
    setEditMode(true);
  };

  // handle field change
  const handleChange = (e: any) => {
    if (!editMode || e.target.name === "email") return;
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // handle edit user
  const handleEditUser = async () => {
    setLoading(true);
    const newUser = user.userType === "instructor" ? await editInstructor(profile) : await editUser(profile);

    if (newUser) {
      dispatch({ type: LEARNER_LOGIN_COMPLETE, payload: newUser });
      toast.success("Profile Updated Successfully");
    }
    setLoading(false);
  };

  // handle select profile pic
  const handleSelectProfilePic = () => {
    if (inputFile.current) {
      inputFile.current.click();
    }
  };

  // handle image select
  const handleImageSelect = (e: any) => {
    setNewProfileImage({
      ...newProfileImage,
      preview: URL.createObjectURL(e.target.files[0]),
      upload: e.target.files[0],
    });
  };

  // change instructor availability
  const changeInstructorAvailability = async (e: any) => {
    setLoading(true);
    const data = await changeAvailability(e.target?.checked, user._id);
    setLoading(false);
    dispatch({ type: LEARNER_LOGIN_COMPLETE, payload: data.instructor });
  };

  // handle update profile pic
  const handleUpdateProfilepic = async () => {
    const formdata = new FormData();
    formdata.append("avater", newProfileImage.upload);

    const newUser =
      user.userType === "instructor" ? await instructorUpdateAvater(formdata) : await updateAvater(formdata);

    if (newUser) {
      dispatch({ type: LEARNER_LOGIN_COMPLETE, payload: newUser });
      toast.success("Avater Updated Successfully");
    }
  };

  console.log(newProfileImage, "profile Image");
  return (
    <>
      {loading && <FullPageSpinner />}
      <div className="profile__page dashboard__padding">
        <div className="profileImage">
          <img src={newProfileImage.preview || user.avater} alt="" />
          <input type="file" id="file" ref={inputFile} onChange={handleImageSelect} style={{ display: "none" }} />
          {newProfileImage.preview ? (
            <div className="image__edit-btn tick__button-submit_profile-pic" onClick={handleUpdateProfilepic}>
              <AiOutlineCheck />
            </div>
          ) : (
            <div className="image__edit-btn" onClick={handleSelectProfilePic}>
              <AiOutlineEdit />
            </div>
          )}
        </div>
        <div className="profile__inputs">
          <p className="title">Your Profile</p>
          {user.userType === "instructor" && (
            <div className="profile__available-indicator">
              <p className="title">Available To Take Booking ? </p>
              <Switch size="medium" checked={user.available} onChange={changeInstructorAvailability} />
            </div>
          )}
          {profileFields?.map((field, key) => {
            if (field.name === "bio" && user.userType !== "instructor") return <></>;
            if (field.name === "bio")
              return (
                <div className="input__wrapper_w-header" key={key}>
                  <p className="title">{field.label}</p>
                  <textarea
                    name={field.name}
                    onChange={handleChange}
                    value={field.defaultValue}
                    className="form-control input__element login"
                    cols={30}
                    rows={10}
                  ></textarea>
                </div>
              );
            if (field.type === "select")
              return (
                <>
                  {user.userType === "learner" && (
                    <div className="input__wrapper_w-header" key={key}>
                      <p className="title">{field.label}</p>
                      <select
                        name={field.name}
                        id=""
                        onChange={handleChange}
                        value={field.defaultValue}
                        className="form-control input__element login"
                      >
                        {field.options?.map((opt) => (
                          <option value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </>
              );
            if (field.name === "car") {
              if (user.userType !== "instructor") return <></>;
              if (!editMode) return <p>Your Car : {user.car?.name}</p>;
              return (
                <Autocomplete
                  onChange={(e, value) => {
                    if (value) setProfile({ ...profile, car: value });
                  }}
                  id="tags-standard"
                  className="movies"
                  options={cars}
                  getOptionLabel={(option: any) => (option.name ? option.name : "Select Car")}
                  defaultValue={profile?.car}
                  renderInput={(params) => (
                    <>
                      <TextField
                        {...params}
                        defaultValue={profile.car?.name}
                        onChange={(e) => console.log(e)}
                        variant="outlined"
                        label={field.label}
                        placeholder={field.label}
                      />
                    </>
                  )}
                />
              );
            }
            return (
              <>
                {
                  <div className="input__wrapper_w-header" key={key}>
                    <p className="title">{field.label}</p>
                    <input
                      name={field.name}
                      onChange={handleChange}
                      value={field.defaultValue}
                      placeholder={field.placeHolder}
                      type={field.type}
                      className="form-control input__element login"
                    />
                  </div>
                }
              </>
            );
          })}
          {/* {editMode ? (
            <div className="profile__buttons">
              <Button loading={loading} title={"Save Profile"} width={"100%"} onClick={handleEditUser} />
            </div>
          ) : (
            <div className="edit__button-profile" onClick={handleEditClick}>
              <AiOutlineEdit />
            </div>
          )} */}
        </div>
      </div>
    </>
  );
};

export default Profile;
