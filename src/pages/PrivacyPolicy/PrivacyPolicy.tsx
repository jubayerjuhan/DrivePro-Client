import React from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import "./PrivacyPolicy.scss";
import privacyPolicies from "./privacyPolicy.json";
import HelmetTitle from "../../components/HelmetTitle/HelmetTitle";

const PrivacyPolicy = () => {
  return (
    <>
      <HelmetTitle title={`Privacy Policy`} />

      <Navbar></Navbar>
      <div className={"privacy__policy-main sectionPadding"}>
        <p className="title">Privacy Policy</p>
        <div className={"privacy__policy-wrapper"}>
          {privacyPolicies.map((policy, key) => {
            return (
              <div className={"privacy__policy-content"} key={key}>
                {policy?.bigTitle && (
                  <p className="bigTitle">{policy?.bigTitle}</p>
                )}
                <p className="title">{policy?.title}</p>
                {policy?.subtitles?.map((sub, key) => (
                  <p className="subtitle" key={key}>
                    {"->"} {sub}
                  </p>
                ))}
                {policy?.links?.map((link, key) => (
                  <a href={link?.link}>
                    <p className="subtitle" key={key}>
                      {"->"} {link?.label}
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
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default PrivacyPolicy;
