import { toast } from "material-react-toastify";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { sendPasswordResetReq } from "../../api_calls/password_api";
import Button from "../../components/core/Button/Button";
import Footer from "../../components/Footer/Footer";
import HelmetTitle from "../../components/HelmetTitle/HelmetTitle";
import Navbar from "../../components/Navbar/Navbar";
import { State } from "../../typings/reduxTypings";
import "./PasswordResetPage.scss";

const PasswordResetPage = ({ instructor }: any) => {
  const { token } = useParams();
  const { user } = useSelector((state: State) => state.user);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });
  const fields = [
    { name: "newPassword", Label: "New Password" },
    { name: "confirmNewPassword", Label: " Confirm New Password" },
  ];

  useEffect(() => {
    if (user) window.location.href = "/";
  }, [user]);

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    if (password.newPassword.length < 8)
      return toast.error("Password Should Be 8 Charecter Or More");

    if (password.confirmNewPassword !== password.newPassword)
      return toast.error("Password Doesn't Match");

    if (!token) return toast.error("No Token Found");

    setLoading(true);

    const data = await sendPasswordResetReq(
      token,
      password.newPassword,
      instructor ? instructor : false
    );
    if (!data.success) {
      toast.error(data.message);
      return setLoading(false);
    }
    setLoading(false);
    toast.success(data.message);

    setTimeout(() => {
      window.location.href = "/";
    }, 4000);
  };
  return (
    <>
      <HelmetTitle title={"Password Reset"} />
      <Navbar></Navbar>
      <div className="reset__password-main sectionPadding">
        <p className="title">
          Forget Password, {instructor ? "Instructor" : "Learner"}
        </p>
        <div className="reset__password-fields">
          {fields.map((field, key) => (
            <input
              onChange={handleFieldChange}
              type={"password"}
              name={field.name}
              placeholder={field.Label}
              className="form-control input__element login"
            />
          ))}

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

export default PasswordResetPage;
