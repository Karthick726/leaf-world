import React from "react";
import { Link } from "react-router-dom";
import { GrHomeRounded } from "react-icons/gr";
import "./Subbanner.css";

const Subbanners = ({ title }) => {
  return (
    <div className="SubAllbanners-hero-image-container">
      <div className="SubAllbanners-hero-image d-flex justify-content-center align-items-center">
        <div className="text-center">
          <h1 className="text-light">{title.toString().toUpperCase()}</h1>

          <nav aria-label="breadcrumb">
            <Link to="/" className="texting">
              <GrHomeRounded className="me-2" />
              Home
            </Link>
            <span className="text-light"> - </span>
            <span className="text-light">
              {title.charAt(0).toUpperCase() + title.slice(1).toLowerCase()}
            </span>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Subbanners;