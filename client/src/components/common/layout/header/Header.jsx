import React from "react";
import "./header.css";
import { Link } from "react-router-dom";

import MobileMenu from "./MobileMenu";
import DesktopMeni from "./DesktopMeni";
import NavbarLinks from "./NavbarLinks";

const Header = () => {
  return (
    <>
      <header>
        <div className="header-strip">
          <div className="header-strip-right">
            <Link to = {"/home-about"}>About us</Link>
            <span style={{ color: "white" }}>|</span>
            <Link to={"/contact"}>Contact</Link>
            <span style={{ color: "white" }}>|</span>
            <Link to={"/home-faq"}>FAQs</Link>
          </div>
        </div>
        <hr className="horizontal" />

        <div className="second-strip">
          <MobileMenu />
          <DesktopMeni />
        </div>
        <hr className="horizontal" />
        <div className="navbar">
         <NavbarLinks/>
        </div>
      </header>
    </>
  );
};

export default Header;
