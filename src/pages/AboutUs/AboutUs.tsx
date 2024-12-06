import React from "react";
import Footer from "../../components/Footer/Footer";
import HelmetTitle from "../../components/HelmetTitle/HelmetTitle";
import Navbar from "../../components/Navbar/Navbar";
import "./AboutUs.scss";

const AboutUs = () => {
  return (
    <div>
      <HelmetTitle title={`About Us - My Instructor`} />

      <Navbar></Navbar>
      <div className="about__us-main sectionPadding">
        <p className="title">About Us</p>
        <p className="description">
          Welcome To My Instructor PTY LTD. My Instructor is a Professional
          Driving School Platform. Here we will provide you only interesting
          content, which you will like very much. We're dedicated to providing
          you the best of Driving School, with a focus on dependability and Book
          Driving Instructor for learning driving and listed as Driving
          Instructor in Australia. . We're working to turn our passion for
          Driving School into a booming online website. We hope you enjoy our
          Driving School as much as we enjoy offering them to you.
        </p>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default AboutUs;
