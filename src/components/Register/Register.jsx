import React, { useEffect } from "react";
import Button from "../core/Button/Button";
import loginImage from "../../assets/7327894.jpg";
import { useForm } from "react-hook-form";
import "./register.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerValidationSchema } from "../../utils/validation_schemas/login_schema";
import Navbar from "../Navbar/Navbar";
import { registerFields } from "./registerInputs";
import { useDispatch, useSelector } from "react-redux";
import { registerLearner } from "../../redux/actions/learner_actions";
import { toast } from "material-react-toastify";
import { CLEAR_ERROR } from "../../redux/reducer/reduxNamings";
import HelmetTitle from "../HelmetTitle/HelmetTitle.jsx";
// import { State } from "../../redux/actions/actionTypings";

const Register = () => {
  const dispatch = useDispatch();
  const { error, user, loading } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerValidationSchema),
  });

  // runs on render
  useEffect(() => {
    if (user) window.location.href = "/";
  }, [user]);

  const onSubmit = (data) => handleRegister(data);

  const handleRegister = async (registerCreds) => {
    if (registerCreds.accessability === "true") registerCreds.accessability = true;
    else registerCreds.accessability = false;
    const register = dispatch(registerLearner(registerCreds));
    if (register === true) return (window.location.href = "/");
  };
  // handling error after submit
  if (error) {
    toast.error(error);
    dispatch({ type: CLEAR_ERROR });
  }

  if (user) return <></>;

  return (
    <>
      <HelmetTitle title={"Register Learner"} />

      <Navbar></Navbar>
      <div className="register__component">
        <div className="register__graphics">
          <img src={loginImage} alt="register Graphics Vector" />
        </div>

        <form action="" className="register__form sectionPadding" onSubmit={handleSubmit(onSubmit)}>
          <div className="register__form-header">
            <p className="title">Learner's Register</p>
            <p className="description">
              If You Already Have a Account. <a href="/login">Login Here</a>
            </p>
          </div>
          {registerFields.map((field, key) => {
            if (field.type === "select") {
              return (
                <div className="input__wrapper_w-header" key={key}>
                  <p className="title">
                    {field.label} <span>*</span>
                  </p>
                  <select
                    type={field.type}
                    placeholder={field.placeholder}
                    {...register(field.name)}
                    className="form-control input__element login"
                  >
                    <option value="">Select License Status</option>
                    {field.options.map((selectOptions, key) => (
                      <option value={selectOptions} key={key}>
                        {selectOptions}
                      </option>
                    ))}
                  </select>
                  {errors[field.name] && <p className="input__errorMessage">{errors[field.name].message}</p>}
                </div>
              );
            }
            return (
              <div className="input__wrapper_w-header" key={key}>
                <p className="title">
                  {field.label} <span>*</span>
                </p>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  {...register(field.name)}
                  className="form-control input__element login"
                />

                {errors[field.name] && <p className="input__errorMessage">{errors[field.name].message}</p>}
              </div>
            );
          })}

          <div className="input__wrapper_w-header">
            <p className="title">
              Do you have accessibility needs? <span>*</span>
            </p>
            <select placeholder={"Hello"} className="form-control input__element login" {...register("accessability")}>
              <option value={false}>No</option>
              <option value={true}>Yes</option>
            </select>
          </div>
          <Button title={"Register"} loading={loading} width="100%" onClick={handleSubmit(onSubmit)} />
        </form>
      </div>
    </>
  );
};

export default Register;
