import React, { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "../../common/layout/header/Header";
import Footer from "../../common/layout/footer/Footer";
import { useLocation } from "react-router-dom";

const Products = () => {
  const location = useLocation();
  const { gender, categoryName } = location.state || {};
  const { menProducts } = useSelector((state) => state.menProducts);
  const { kidsProducts } = useSelector((state) => state.kidsProducts);
  const { womenProducts } = useSelector((state) => state.womenProducts);

 
  


  console.log("Men Products", menProducts);
  console.log("kids Products", kidsProducts);
  console.log("Women Products", womenProducts);
  console.log("gender",gender,categoryName)
  return (
    <Fragment>
      <Header />
      
      <Footer />
    </Fragment>
  );
};

export default Products;
