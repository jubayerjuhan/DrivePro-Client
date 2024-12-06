import React, { useEffect } from "react";
import Button from "../../components/core/Button/Button";
import loginImage from "../../assets/7327894.jpg";
import instructorLoginImage from "../../assets/20908709_6382323.jpg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginValidationSchema } from "../../utils/validation_schemas/login_schema";
import Navbar from "../../components/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { loginLearner } from "../../redux/actions/learner_actions";
import { toast } from "material-react-toastify";
import { CLEAR_ERROR } from "../../redux/reducer/reduxNamings";
import { useLocation, useNavigate } from "react-router-dom";
import { loginInstructor } from "../../redux/actions/instructor_actions";
import HelmetTitle from "../../components/HelmetTitle/HelmetTitle.jsx";
import "./Login.scss";

const Login = ({ instructor }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { error, user, loading } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginValidationSchema),
  });

  useEffect(() => {
    if (user) window.location.href = state ? state.from.location : "/";
  }, [user, state]);

  // submit form
  const onSubmit = (data) => handleLogin(data);

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

  const handleLogin = async (data) => {
    if (instructor) {
      const instructorLogin = dispatch(loginInstructor(data));
    } else {
      const learnerLogin = dispatch(loginLearner(data));
    }
  };

  if (error) {
    toast.error(error);
    dispatch({ type: CLEAR_ERROR });
  }
  if (user) return <></>;
  return (
    <>
      <HelmetTitle title={instructor ? "Instructor Login" : "Learner Login"} />

      <Navbar></Navbar>
      <div className="login__component sectionPadding">
        <div className="login__graphics">
          <img src={instructor ? instructorLoginImage : loginImage} alt="Login Graphics Vector" />
        </div>

        <form action="" className="login__form " onSubmit={handleSubmit(onSubmit)}>
          <div className="login__form-header">
            <p className="title">{instructor ? "Instructor" : "Learner's"} Login</p>
            {instructor ? (
              <p className="description">
                <a href="/forget-password/instructor">Forgot Password?</a>
              </p>
            ) : (
              <>
                <p className="description">
                  If You Don't Have Any Account. <a href="/register">Register Here</a>
                </p>
                <p className="description">
                  <a href="/forget-password">Forgot Password?</a>
                </p>
              </>
            )}
          </div>{" "}
          {inputFields.map((field, key) => {
            return (
              <div>
                <input
                  key={key}
                  type={field.type}
                  placeholder={field.placeholder}
                  {...register(field.name)}
                  className="form-control input__element login"
                />
                {errors[field.name] && <p className="input__errorMessage">{errors[field.name].message}</p>}
              </div>
            );
          })}
          <Button width="100%" title={"Login"} loading={loading} onClick={handleSubmit(onSubmit)} />
        </form>
      </div>
    </>
  );
};

export default Login;
