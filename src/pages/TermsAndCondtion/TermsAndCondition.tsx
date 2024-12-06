import React from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import "../PrivacyPolicy/PrivacyPolicy.scss";
import termsAndConditionLearner from "./termsAndConditionLearners.json";
import termsAndConditionInstructor from "./termsAndConditionInstructors.json";
import HelmetTitle from "../../components/HelmetTitle/HelmetTitle";

interface Props {
  learner?: boolean;
}

const TermsAndCondition = ({ learner }: Props) => {
  return (
    <>
      <HelmetTitle
        title={`${
          learner ? "Learner" : "Instructor"
        }Terms and Conditions - My Instructor`}
      />

      <Navbar></Navbar>
      <div className={"privacy__policy-main sectionPadding"}>
        <p className="title">
          {learner ? "Learner" : "Instructor"} Terms & Condition
        </p>
        <div className={"privacy__policy-wrapper"}>
          {learner ? (
            <>
              {termsAndConditionLearner.map((policy, key) => {
                return (
                  <div className={"privacy__policy-content"} key={key}>
                    {/* {policy.bigTitle policy?.bigTitle && (
                  <p className="bigTitle">{policy?.bigTitle}</p>
                )} */}
                    <p className="title">{policy?.title}</p>
                    {policy?.subtitles?.map((sub, key) => (
                      <p className="subtitle" key={key}>
                        {sub}
                      </p>
                    ))}
                    {policy?.links?.map((link, key) => (
                      <a href={link?.link}>
                        <p className="subtitle" key={key}>
                          {link?.label}
                        </p>
                      </a>
                    ))}
                    <div className={"list__wrapper"}>
                      <ul className="list">
                        {policy?.list?.map((item, key) => (
                          <li className="list__item" key={key}>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <>
              {termsAndConditionInstructor.map((policy, key) => {
                return (
                  <div className={"privacy__policy-content"} key={key}>
                    {policy.title && (
                      <p className="title" key={key}>
                        {policy.title}
                      </p>
                    )}
                    {policy.subtitles?.map((sub, key) => (
                      <p
                        className="subtitle"
                        key={key}
                        style={{ marginBottom: "15px" }}
                      >
                        {sub}
                      </p>
                    ))}
                    <div className={"list__wrapper"}>
                      <ul className="list">
                        {policy?.list?.map((item, key) => (
                          <li className="list__item" key={key}>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default TermsAndCondition;
