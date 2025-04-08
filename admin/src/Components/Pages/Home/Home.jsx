import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <Fragment>
      <main
        id="main"
        className="main"
        style={{ backgroundColor: "#F9F9F9", padding: "20px" }}
      >
        <div className="pagetitle">
          <h1 style={{ fontWeight: "bold", color: "#333" }}>Dashboard</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/" style={{ color: "#6C757D" }}>
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item active">Dashboard</li>
            </ol>
          </nav>
        </div>
      </main>
    </Fragment>
  );
};

export default Home;
