import React, { useEffect, useState } from "react";
import InstructorCard from "../../components/InstructorCard/InstructorCard";
import Navbar from "../../components/Navbar/Navbar";
import PricingCalculator from "../../components/PricingCalculator/PricingCalculator";
// import CustomizedSteppers from "../../components/Stepper/Stepper";
import Switch from "@mui/material/Switch";
import languages from "../../json_data/languages.json";
import "./InstructorList.scss";
import { useParams } from "react-router-dom";
import { searchInstructor } from "../../api_calls/instructor_list";
import { client } from "../../client";
import { Instructor, Suburb } from "../../typings/instructorTypings";
import CheckAvailability from "../../components/CheckAvailability/CheckAvailability";
import HelmetTitle from "../../components/HelmetTitle/HelmetTitle";

const InstructorList = () => {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [language, setLanguage] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [lookupInstructor, setLookupInstructor] = useState({});
  const [suburbInfo, setSuburbInfo] = useState<Suburb>();

  const label = { inputProps: { "aria-label": "Switch demo" } };
  const { postCode, transmission, suburb } = useParams();

  useEffect(() => {
    getSuburbInfo();
  }, []);

  useEffect(() => {
    getInstructors();
  }, [language]);

  const getInstructors = async () => {
    const instructors = await searchInstructor(
      postCode,
      transmission,
      language
    );
    setInstructors(instructors);
  };

  const getSuburbInfo = async () => {
    const { data } = await client.get(`/search-suburbs/${suburb}`);
    setSuburbInfo(data?.suburbs[0]);
  };

  //  check availability handle
  const handleCheckAvailability = (id: any, name: string) => {
    console.log("id name", id, name);
    setShowModal(true);
    setLookupInstructor({ id, name });
  };

  return (
    <>
      <HelmetTitle title={`Instructors - My Instructor`} />
      {showModal && (
        <CheckAvailability
          visible={showModal}
          setShowModal={setShowModal}
          instructor={lookupInstructor}
        />
      )}

      <div className="instructor__list">
        <Navbar />
        {/* <CustomizedSteppers /> */}
        <div className="instructors__main sectionPadding">
          <div className="all__instructors-wrapper">
            <p className="title">
              Found {instructors?.length} Instructors In{" "}
              {suburbInfo?.suburb ? suburbInfo?.suburb : "In Your Area"}
            </p>
            <div className="all-instructors__list">
              {instructors?.map((instructor, key) => {
                if (!instructor.available) return <></>;
                return (
                  <InstructorCard
                    handleCheckAvailability={handleCheckAvailability}
                    instructor={instructor}
                    key={key}
                  />
                );
              })}
            </div>
          </div>
          <div className="instructors__filters">
            {/* <div className="time__filter">
              <p className="title">Time</p>
              <p className="filter__content active">Any Time</p>
              <p className="filter__content">AM</p>
              <p className="filter__content">PM</p>
            </div>
            <div className="available__filter">
              <p className="title">Show Available Only</p>
              <Switch {...label} checked={true} />
            </div> */}
            <div className="language__filter">
              <p className="title">Language</p>
              <select
                className="form-select"
                aria-label="Language"
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value={"all"}>Select Language</option>
                {languages.map((language, key) => (
                  <option value={language.name}>{language.name}</option>
                ))}
              </select>
            </div>
          </div>
          <PricingCalculator bookForward={false} cart={false} />
        </div>
      </div>
    </>
  );
};

export default InstructorList;
