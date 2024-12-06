import React from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import image from "../../assets/Gift card-pana.png";
import { giftCardFields } from "../../utils/InputFieldsDetail/InputFieldsDetail";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { giftCardValidationSchema } from "../../utils/validation_schemas/login_schema";
import Button from "../../components/core/Button/Button";
import "./GiftCardPage.scss";
import { useNavigate } from "react-router-dom";
import HelmetTitle from "../../components/HelmetTitle/HelmetTitle";
const GiftCardPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(giftCardValidationSchema),
  });

  const onSubmit = (data: any) => handleGiftCardSubmit(data);

  const handleGiftCardSubmit = (data: any) => {
    navigate("/checkout", { state: { giftcard: data } });
  };

  return (
    <div>
      <HelmetTitle title={`Gift Card - My Instructor`} />

      <Navbar></Navbar>

      <div className="gift__card-main sectionPadding">
        <div className="gift__card-image">
          <img src={image} alt="" />
        </div>
        <div className="gift__card-info">
          <p className="title">Send Gift Card </p>
          {giftCardFields.map((field, key) => {
            return (
              <div>
                <input
                  key={key}
                  type={field.type}
                  placeholder={field.placeholder}
                  {...register(field.name)}
                  className="form-control input__element login"
                />
                {errors[field.name] && (
                  <p className="input__errorMessage">
                    <>{errors[field.name as keyof typeof errors]?.message}</>
                  </p>
                )}
              </div>
            );
          })}
          <Button
            width={"100%"}
            title={"Send Gift"}
            onClick={handleSubmit(onSubmit)}
          />
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default GiftCardPage;
