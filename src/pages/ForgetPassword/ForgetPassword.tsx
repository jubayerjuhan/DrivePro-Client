import React, { useEffect, useState } from "react";
import { sendForgetPasswordReq } from "../../api_calls/password_api";
import Button from "../../components/core/Button/Button";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { toast } from "material-react-toastify";
import "./ForgetPassword.scss";
import { useSelector } from "react-redux";
import { State } from "../../typings/reduxTypings";
import HelmetTitle from "../../components/HelmetTitle/HelmetTitle";

interface ForgetPasswordProps {
  instructor?: boolean;
}
const ForgetPassword = ({ instructor }: ForgetPasswordProps) => {
  const { user } = useSelector((state: State) => state.user);

  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const field = {
    type: "email",
    label: "Email Address",
    placeholder: "Enter Your Email Address",
  };
  useEffect(() => {
    if (user) window.location.href = "/";
  }, [user]);
  const handleSubmit = async () => {
    setLoading(true);
    const res = await sendForgetPasswordReq(
      email,
      instructor ? instructor : false
    );
    if (!res.success) {
      toast.error(res.message);
      return setLoading(false);
    }
    toast.success(res.message);
    setLoading(false);

    setTimeout(() => {
      window.location.href = "/";
    }, 5000);
  };
  return (
    <>
      <HelmetTitle title={"Forget Password"} />

      <Navbar></Navbar>
      <div className="forget__password-main sectionPadding">
        <p className="title">
          Forget Password, {instructor ? "Instructor" : "Learner"}
        </p>
        <div className="forget__password-fields">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type={field.type}
            placeholder={field.placeholder}
            className="form-control input__element login"
          />
          <Button
            loading={loading}
            title={"Submit"}
            width={"100%"}
            onClick={handleSubmit}
          />
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default ForgetPassword;
