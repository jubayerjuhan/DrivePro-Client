import React, { useEffect, useState } from "react";
import { BsGenderMale, BsGenderFemale } from "react-icons/bs";
import { MdFlashAuto } from "react-icons/md";
import { AiFillStar, AiOutlineIdcard, AiOutlineCar } from "react-icons/ai";
import { TbManualGearbox } from "react-icons/tb";
import { IoLanguage } from "react-icons/io5";
import moment from "moment";

import "./InstructorProfileInfo.scss";
import { Instructor } from "../../typings/instructorTypings";

export interface InstructorProfileProps {
  instructor: Instructor;
}
const InstructorProfileInfo = ({ instructor }: InstructorProfileProps) => {
  const [overallRating, setOverallRating] = useState<string | number>("Not Yet Rated");
  console.log(instructor);
  const instructorQualities = [
    { label: " Driving Instructor's Licence ", icon: <AiOutlineIdcard /> },
    { label: " Children Check Licence ", icon: <AiOutlineIdcard /> },
    {
      label: "  Spoken language(s)     ",
      icon: <IoLanguage />,
      languages: instructor.languages,
    },
  ];

  useEffect(() => {
    countOverallRating(instructor.reviews);
  }, []);

  const countOverallRating = (reviews: any) => {
    let totalRating = 0;

    reviews.forEach((review: any) => {
      totalRating += review?.rating;
    });

    if (reviews.length > 0) setOverallRating(totalRating / reviews?.length);
  };

  return (
    <div className="instructor__profile-info">
      <p className="name">
        {instructor.firstName} {instructor.lastName}
      </p>
      <div className="emoji__info">
        <div className="em-info">
          {instructor.gender === "Female" ? <BsGenderFemale /> : <BsGenderMale />}

          <p className="title">{instructor.gender}</p>
        </div>
        <div className="em-info">
          {instructor.transmissionType === "Auto" ? <MdFlashAuto /> : <TbManualGearbox />}
          <p className="title">{instructor.transmissionType}</p>
        </div>
        <div className="em-info">
          <AiFillStar />
          <p className="title">{overallRating}</p>
        </div>
      </div>
      <div className="instructor__qualities-wrapper">
        {instructorQualities.map((quality, key) => {
          return (
            <div className="instructor__quality-opt" key={key}>
              <div className="icon">{quality.icon}</div>
              <div className="titleWrapper">
                <div className="title">{quality.label}</div>
                {quality?.languages?.map((language, key) => {
                  return (
                    <p className="language" key={key}>
                      {language}
                    </p>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InstructorProfileInfo;
