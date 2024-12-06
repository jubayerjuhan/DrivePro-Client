import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { client } from "../../client";
import Button from "../../components/core/Button/Button";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import "./ApplicationSuccess.scss";

const ApplicationSuccess = () => {
  const [loading, setLoading] = useState(false);
  const [application, setApplication] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams();
  useEffect(() => {
    getApplicationInformation();
  }, []);

  const getApplicationInformation = async () => {
    setLoading(true);
    try {
      const { data } = await client.get(`/instructor-application/${id}`);
      if (!data.applicant) navigate("/");
      setLoading(false);

      setApplication(data.applicant);
    } catch (error) {
      setLoading(false);
      navigate("/");
    }
  };
  return (
    <>
      <Navbar />
      <div className="application__success-page sectionPadding">
        {loading && !application ? (
          <CircularProgress />
        ) : (
          <>
            <p className="title">Your Application Submitted Successfully</p>
            <p className="description">
              Thank You For Applying as a Driving Instructor At My Instructor.
              We Recieved Your Application. We Will Reach You Soon
            </p>

            <Button
              width={"40%"}
              title={"Go To Home"}
              onClick={() => (window.location.href = "/")}
            />
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ApplicationSuccess;
