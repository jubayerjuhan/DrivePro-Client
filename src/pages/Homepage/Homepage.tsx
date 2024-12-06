import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Advantage from "../../components/Advantage/Advantage";
import Chat from "../../components/Chat/Chat";
import FaqSection from "../../components/FaqSection/FaqSection";
import Footer from "../../components/Footer/Footer";
import FourIconComponent from "../../components/FourIconComponent/FourIconComponent";
import GetReady from "../../components/GetReady/GetReady";
import HelmetTitle from "../../components/HelmetTitle/HelmetTitle";
import HeroSection from "../../components/HeroSection/HeroSection";
import HomeCounterComponent from "../../components/HomeCounterComponent/HomeCounterComponent";
import HomeGiftcard from "../../components/Home_Giftcard/Home_Giftcard";
import HowItWorks from "../../components/HowItWorks/HowItWorks";
import Navbar from "../../components/Navbar/Navbar";
import ReviewSlider from "../../components/ReviewSlider/ReviewSlider";
import WhyusSection from "../../components/WhyusSection/WhyusSection";
import { State } from "../../typings/reduxTypings";

interface Props {
  title?: string;
}
const cities = [
  "melbourne",
  "sydney",
  "brisbane",
  "perth",
  "adelaide",
  "hobart",
  "canaberra",
];
const Homepage = ({ title }: Props) => {
  const { city } = useParams();
  const { user } = useSelector((state: State) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (city && !cities.includes(city)) return navigate("not-found");
  }, [city, navigate]);

  return (
    <div>
      <HelmetTitle title={"My Instructor - Find Driving Instructor"} />

      {!user || user?.userType !== "instructor" ? <Chat></Chat> : <></>}
      <Navbar />
      <HeroSection
        title={
          city
            ? `Find Driving Instructor In ${
                city.charAt(0).toUpperCase() + city.slice(1)
              }`
            : title
        }
      />
      {/* <HomeCounterComponent /> */}
      <HowItWorks />
      <FourIconComponent />
      <HomeGiftcard />
      <FaqSection />
      <WhyusSection />
      <Advantage />
      <GetReady />
      {/* <ReviewSlider /> */}
      <Footer />
    </div>
  );
};

export default Homepage;
