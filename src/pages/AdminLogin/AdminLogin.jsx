import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import loginImage from "../../assets/undraw_Login_re_4vu2.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginValidationSchema } from "../../utils/validation_schemas/login_schema";
import Button from "../../components/core/Button/Button";
import { adminLogin } from "../../api_calls/admin_api";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_ERROR, CLEAR_SUCCESS } from "../../redux/reducer/reduxNamings";
import { toast } from "material-react-toastify";
import HelmetTitle from "../../components/HelmetTitle/HelmetTitle.jsx";
import "./AdminLogin.scss";

const inputFields = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter Email",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter Password",
    type: "password",
  },
];

const AdminLogin = () => {
  const dispatch = useDispatch();
  const { error, success, loading } = useSelector((state) => state.admin);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginValidationSchema),
  });

  const onSubmit = (data) => handleLogin(data);

  const handleLogin = async (data) => {
    const adminData = await dispatch(adminLogin(data));
  };

  if (success) {
    dispatch({ type: CLEAR_SUCCESS });
    window.location.href = "/admin/dashboard";
  }

  if (error) {
    toast.error(error);
    dispatch({ type: CLEAR_ERROR });
  }
  return (
    <>
      <HelmetTitle title={`Admin Login - My Instructor`} />

      <Navbar></Navbar>
      <div className="login__component">
        <div className="login__graphics">
          <img src={loginImage} alt="Login Graphics Vector" />
        </div>

        <form action="" className="login__form sectionPadding" onSubmit={handleSubmit(onSubmit)}>
          <div className="login__form-header">
            <p className="title">Admin Login</p>
          </div>{" "}
          <div className="login__form-admin">
            {inputFields.map((field, key) => {
              return (
                <div key={key}>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    {...register(field.name)}
                    className="form-control input__element login "
                  />
                </div>
              );
            })}
            <Button width="100%" title={"Login"} loading={loading} onClick={handleSubmit(onSubmit)} />
          </div>
        </form>
      </div>
    </>
  );
};

export default AdminLogin;
