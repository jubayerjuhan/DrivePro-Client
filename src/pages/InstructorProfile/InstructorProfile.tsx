import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import "./InstructorProfile.scss";
import InstructorProfileInfo from "../../components/InstructorProfileInfo/InstructorProfileInfo";
import Button from "../../components/core/Button/Button";
import InstructorReviews from "../../components/InstructorReviews/InstructorReviews";
import InstructorVehical from "../../components/InstructorVehical/InstructorVehical";
import { useParams } from "react-router-dom";
import { client } from "../../client";
import { Instructor } from "../../typings/instructorTypings";
import CheckAvailability from "../../components/CheckAvailability/CheckAvailability";
import { useDispatch } from "react-redux";
import { SET_INSTRUCTOR } from "../../redux/reducer/reduxNamings";
import HelmetTitle from "../../components/HelmetTitle/HelmetTitle";

const InstructorProfile = () => {
  const [instructor, setInstructor] = useState<Instructor>();
  const [showModal, setShowModal] = useState<boolean>(false);

  const dispatch = useDispatch();

  const { id } = useParams();
  useEffect(() => {
    getInsttructor();
  }, []);

  const getInsttructor = async () => {
    try {
      const { data } = await client.get(`/instructor/${id}`);
      setInstructor(data.instructor);
    } catch (error) {
      window.location.href = "/not-found";
    }
  };

  // handle book now
  const handleBookNow = () => {
    dispatch({ type: SET_INSTRUCTOR, payload: instructor });
    window.location.href = "/booking";
  };

  if (!instructor) return <></>;
  return (
    <>
      <HelmetTitle title={`Instructor Profile`} />

      {showModal && (
        <CheckAvailability
          visible={showModal}
          setShowModal={setShowModal}
          instructor={{ id: instructor._id, name: instructor.firstName }}
        />
      )}
      <Navbar />
      <div className="instructor__profile">
        <div className="instructor__profile-header">
          <div className="profile__header-accentColor"></div>
          <div className="instructor__profile-image">
            <div className="profile__picture-wrapper">
              <img src={`${instructor?.avater}`} alt="" />
            </div>
          </div>
        </div>
        <div className="instructor__profile-main sectionPadding">
          <div className="instructor__profile-left">
            <InstructorProfileInfo instructor={instructor} />
            {/* <InstructorProfilePolicies /> */}
            {instructor.bio && (
              <div className="instructor__bio">
                <div className="title">Bio</div>
                <p className="description">{instructor.bio}</p>
              </div>
            )}
            <InstructorVehical instructor={instructor} />
          </div>
          <div className="instructor__profile-right">
            <div className="instructor__action-buttons">
              <Button width="100%" smallFont title="Book Now" onClick={handleBookNow} />
              <Button
                onClick={() => setShowModal(true)}
                width="100%"
                smallFont
                title="Check Availability"
                revertColor
              />
            </div>
            <InstructorReviews reviews={instructor.reviews} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default InstructorProfile;
