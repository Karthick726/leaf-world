import React, { useState } from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import { Link } from "react-router-dom";

const MobileMenu = () => {
  const [menMobile, setMenMobile] = useState(false);
  const [womenMobile, setWomenMobile] = useState(false);
  const handleMobileMenu = (gender) => {
    console.log(gender);

    switch (gender) {
      case "men":
        !menMobile ? setMenMobile(true) : setMenMobile(false);
        break;

      case "women":
        !womenMobile ? setWomenMobile(true) : setWomenMobile(false);
        break;

      case "kids":
        break;

      default:
        break;
    }
  };
  return (
    <>
      <div className="drawer">
        <MenuRoundedIcon
          data-bs-toggle="offcanvas"
          href="#offcanvasExample"
          role="button"
          style={{ color: "white" }}
        />

        <div
          className="offcanvas offcanvas-start"
          tabIndex="-1"
          id="offcanvasExample"
          aria-labelledby="offcanvasExampleLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasExampleLabel">
              Leaf World
            </h5>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            />
          </div>

          <div className="offcanvas-body">
            <div className="dropdown mt-3">
              <ul className="mobile-navbar">
                <li>
                  <Link data-bs-toggle="dropdown">Home</Link>
                  <ArrowDropDownRoundedIcon />
                </li>
                <li>
                  <Link data-bs-toggle="dropdown">Men</Link>
                  <ArrowDropDownRoundedIcon
                    onClick={() => handleMobileMenu("men")}
                  />
                  <ul
                    className={`mobile-men-menu ${
                      menMobile ? "mobile-men-menu-show" : ""
                    }`}
                  >
                    <li>
                      <Link>Shirt</Link>
                    </li>
                    <li>
                      <Link>Shirt</Link>
                    </li>
                    <li>
                      <Link>Shirt</Link>
                    </li>
                    <li>
                      <Link>Shirt</Link>
                    </li>
                    <li>
                      <Link>Shirt</Link>
                    </li>
                    <li>
                      <Link>Shirt</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link data-bs-toggle="dropdown">Women</Link>
                  <ArrowDropDownRoundedIcon
                    onClick={() => handleMobileMenu("women")}
                  />
                  <ul
                    className={`mobile-men-menu ${
                      womenMobile ? "mobile-men-menu-show" : ""
                    }`}
                  >
                    <li>
                      <Link>chudidhar</Link>
                    </li>
                    <li>
                      <Link>Shirt</Link>
                    </li>
                    <li>
                      <Link>Shirt</Link>
                    </li>
                    <li>
                      <Link>Shirt</Link>
                    </li>
                    <li>
                      <Link>Shirt</Link>
                    </li>
                    <li>
                      <Link>Shirt</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link data-bs-toggle="dropdown">Kids</Link>
                  <ArrowDropDownRoundedIcon />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
