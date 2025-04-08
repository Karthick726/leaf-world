import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../Header/Header";

const HeaderAllow = (props) => {
  const { setAdmin } = props;
  const location = useLocation();
  const headerPaths = [
    "/",
    "/products-name",
    "/coursel-get",
    "/manage/coursel",
    "/manage/userIssues",
    "/manage/contact",
   "/manage/products",
    "/products-details",

  ];
  return (
    <>
      {headerPaths.includes(location.pathname) && (
        <Header setAdmin={setAdmin} />
      )}
    </>
  );
};

export default HeaderAllow;
