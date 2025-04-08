import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NavbarLinks = () => {
  const navigate = useNavigate();

  const hanldeNavigate = (value) => {
    navigate("/products", {
      state: { gender: "men", categoryName: value },
    });
  };
  return (
    <>
      <div className="navbar-links">
        <ul className="navbar-list">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <span style={{ color: "white" }}>|</span>
          <li className="men-menu">
            <Link to="/products-details">Men</Link>

            <ul className="men-submenu">
              <li onClick={() => hanldeNavigate("shirt")}>
                <Link to="/products-details">Shirt</Link>
              </li>
              <li>
                <Link to="/products-details">Shirt</Link>
              </li>
              <li>
                <Link to="/products-details">Shirt</Link>
              </li>
              <li>
                <Link to="/products-details">Shirt</Link>
              </li>
              <li>
                <Link to="/products-details">Shirt</Link>
              </li>
              <li>
                <Link to="/products-details">Shirt</Link>
              </li>
            </ul>
          </li>{" "}
          <span style={{ color: "white" }}>|</span>
          <li>
            <Link to="/products-details">Women</Link>
          </li>
          <span style={{ color: "white" }}>|</span>
          <li>
            <Link to="/products-details">Kids</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default NavbarLinks;
