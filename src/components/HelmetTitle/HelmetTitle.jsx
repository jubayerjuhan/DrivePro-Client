import React from "react";
import { Helmet } from "react-helmet";

const HelmetTitle = ({ title }) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title ? title : "React App"}</title>
      <link rel="canonical" href="http://mysite.com/example" />
    </Helmet>
  );
};

export default HelmetTitle;
