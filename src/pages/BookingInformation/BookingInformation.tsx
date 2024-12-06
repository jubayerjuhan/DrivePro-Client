import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import "./BookingInformation.scss";
import states from "../../utils/supportedStates.json";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Button from "../../components/core/Button/Button";
import CustomPopupModal from "../../components/CustomPopupModal/CustomPopupModal";
import { pickupInfoSchema } from "../../utils/validation_schemas/billing_schema";
import { CartInstructor } from "../AddToCart/AddToCart";
import { useDispatch, useSelector } from "react-redux";
import { State, User } from "../../typings/reduxTypings";
import { BsCalendar2Date } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { getCurrentUser } from "../../api_calls/user_api";
import { CLEAR_SUCCESS, SET_PICKUP_DETAILS } from "../../redux/reducer/reduxNamings";
import { bookLesson } from "../../redux/actions/bookingAction";
import HelmetTitle from "../../components/HelmetTitle/HelmetTitle";
import SuburbSelector from "../../components/SuburbSelector/SuburbSelector";

export interface BookingInfoProps {
  state: {
    testPackage?: boolean;
  };
}

const BookingInformation = () => {
  const [loading, setLoading] = useState(false);
  const [creditError, setCreditError] = useState(false);
  const [pickUpInformation, setPickupInfotmation] = useState({});
  const { instructor } = useSelector((state: State) => state.instructor);
  const {
    booking,
    loading: modalLoading,
    success,
    pickupDetails,
    error,
  } = useSelector((state: State) => state.booking);
  const { state }: BookingInfoProps = useLocation();
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const [modal, setModal] = useState({
    visible: false,
    title: "",
    description: "",
    onModalSave: () => {},
  });
  const pickupDetailsField = [
    { name: "address", label: " Pickup Address", type: "text" },
    { name: "suburb", label: "Suburb", type: "suburb" },
    { name: "postcode", label: "Post Code", type: "text" },
    { name: "state", label: "State", type: "select", options: states },
  ];

  useEffect(() => {
    if (!booking) return navigate("/not-found");
  }, [booking, navigate]);

  if (success) {
    dispatch({ type: CLEAR_SUCCESS });
    navigate("/booking-success", { state: { instructor, booking } });
  }

  // react hook form
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(pickupInfoSchema),
  });

  // =============on submit
  const onSubmit = (data: any) => {
    // return console.log(data, "data");
    handleSubmitClick(data);
  };

  const handleSubmitClick = async (data: any) => {
    setCreditError(false);
    // setPickup address
    dispatch({ type: SET_PICKUP_DETAILS, payload: data });
    setPickupInfotmation(data);

    if (state?.testPackage) {
      return navigate("/checkout", { state: { testPackage: true } });
    }

    setLoading(true);
    const user: User = await getCurrentUser();
    setLoading(false);

    if (user.credit < booking.duration) {
      setModal({
        ...modal,
        visible: true,
        title: "Not Enough Credit!",
        description: `Oops, Not Enough Credit Available On Your Account. To Purchase Credit Please Click "Continue" Button Down Below`,
      });
      return setCreditError(true);
    }

    setModal({
      ...modal,
      visible: true,
      title: "Are You Sure ?",
      description: `Are You Sure You Want To Book ${booking.duration} Hours Driving Lesson With ${
        instructor.firstName
      }, Which Starts From ${moment(booking.time.startFrom).format("MMM D YYYY, h:mm a")}`,
    });
  };

  // handle modal
  const handleModalCancel = () => {};

  const onModalSave = async () => {
    console.log("clicked");
    if (!creditError) {
      const bookingInfo = {
        instructor: instructor._id,
        time: {
          from: booking.time.startFrom,
          to: booking.time.endTo,
        },
        type: booking?.type,
        duration: booking.duration,
        pickupDetails: pickUpInformation,
      };

      return dispatch(bookLesson(bookingInfo));
    }

    // if credit error handle this
    navigate("/add-cart", { state: { bookForward: true } });
  };

  const handleModalClose = () => {
    setModal({ ...modal, visible: false });
  };

  if (!booking) return <></>;

  return (
    <>
      <HelmetTitle title={`Booking Informations - My Instructor`} />

      <CustomPopupModal
        loading={modalLoading}
        title={modal.title}
        description={modal.description}
        handleCancel={handleModalCancel}
        handleClose={handleModalClose}
        handleSave={onModalSave}
        saveLabel={creditError ? "Continue" : "Yes"}
        show={modal.visible}
      />
      <Navbar />
      <div className="booking__info-main sectionPadding">
        <div className="booking__details">
          <div className="booking-pickup__details">
            <p className="title">Pickup Details</p>
            <div className="fields">
              {pickupDetailsField.map((field, key) => {
                if (field.type === "suburb")
                  return <SuburbSelector setValue={setValue} error={errors[field.name]?.message} />;
                if (field.type === "select")
                  return (
                    <div>
                      <p className="fieldLabel">
                        {field.label} <span>*</span>
                      </p>
                      <select
                        placeholder={`Enter ${field.label}`}
                        {...register(field.name)}
                        className="form-control input__element login"
                      >
                        <option value="">Select State</option>
                        {field.options?.map((selectOptions, key) => (
                          <option value={selectOptions.name} key={key}>
                            {selectOptions.name}
                          </option>
                        ))}
                      </select>
                      {errors[field.name] && (
                        <p className="input__errorMessage">
                          <> {errors[field.name]?.message}</>
                        </p>
                      )}
                    </div>
                  );
                return (
                  <div>
                    <p className="fieldLabel">
                      {field.label} <span>*</span>
                    </p>
                    <input
                      key={key}
                      type={field.type}
                      placeholder={`Enter ${field.label} *`}
                      {...register(field.name)}
                      className="form-control input__element login"
                    />
                    {errors[field.name] && (
                      <p className="input__errorMessage">
                        <> {errors[field.name]?.message}</>
                      </p>
                    )}
                  </div>
                );
              })}
              <Button loading={loading} title={"Submit"} width={"100%"} onClick={handleSubmit(onSubmit)} />
            </div>
          </div>
          <div className="booking-pickup__details"></div>
        </div>
        <div className="booking__cart">
          <CartInstructor instructor={instructor} />
          <div className="bookingTime">
            <BsCalendar2Date />
            <div className="booking__info">
              <p className="title">You are about to make the following bookings with {instructor.firstName}</p>
              <div className="booking__time">
                <p className="title">Duration: {booking.duration} hours</p>
                <p className="title">Start At: {moment(booking.time?.startFrom).format("MMM D YYYY, h:mm a")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookingInformation;
