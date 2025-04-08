import React, { Fragment } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@mui/material";
import client from "../../Client/Client";
import toast from "react-hot-toast";

const Sidebar = ({ open, toggleSidebar, setAdmin }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    try {
      const res = await client.post(
        "/admins/logout",
        {},
        { withCredentials: true }
      );
      if (res.status === 200) {
        localStorage.removeItem("token");
        localStorage.removeItem("Username");
        localStorage.removeItem("tokenExpiration");
        setAdmin(null);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      toast.error(
        err.response?.status === 401
          ? "Token is invalid. Login again."
          : "Try again"
      );
    }
  };

  return (
    <Fragment>
      <aside id="sidebar" className={`sidebar ${open ? "open" : ""}`}>
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <Link
              className={`nav-link ${isActive("/") ? "active" : "collapsed"}`}
              to="/"
            >
              <i className="bi bi-grid" />
              <span>Dashboard</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className={`nav-link ${
                isActive("/products-name") || isActive("/products-details")
                  ? "active"
                  : "collapsed"
              }`}
              data-bs-target="#icons-nav"
              data-bs-toggle="collapse"
              to="#"
            >
              <i class="bi bi-box-seam"></i>
              <span>Products</span>
              <i className="bi bi-chevron-down ms-auto" />
            </Link>
            <ul
              id="icons-nav"
              className="nav-content collapse"
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <Link
                  to="/products-name"
                  className={isActive("/products-name") ? "active" : ""}
                >
                  <i className="bi bi-circle" />
                  <span>Product Name</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/products-details"
                  className={isActive("/products-details") ? "active" : ""}
                >
                  <i className="bi bi-circle" />
                  <span>Products Details</span>
                </Link>
              </li>
            </ul>
          </li>




          <li className="nav-item">
            <Link
              className={`nav-link ${
                isActive("/coursel-get") || isActive("/coursel-get")
                  ? "active"
                  : "collapsed"
              }`}
              data-bs-target="#icons-navss"
              data-bs-toggle="collapse"
              to="#"
            >
              <i class="bi bi-box-seam"></i>
              <span>Coursel</span>
              <i className="bi bi-chevron-down ms-auto" />
            </Link>
            <ul
              id="icons-navss"
              className="nav-content collapse"
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <Link
                  to="/coursel-get"
                  className={isActive("/coursel-get") ? "active" : ""}
                >
                  <i className="bi bi-circle" />
                  <span>Coursel</span>
                </Link>
              </li>
             
            </ul>
          </li>


      

          <li className="nav-heading">Manage</li>
          <li className="nav-item">
            <Link
              className={`nav-link ${
                isActive("/manage/products") 
                  ? "active"
                  : "collapsed"
              }`}
              data-bs-target="#icons-navs"
              data-bs-toggle="collapse"
              to="#"
            >
              <i class="bi bi-box-seam"></i>
              <span>Manage Products</span>
              <i className="bi bi-chevron-down ms-auto" />
            </Link>
            <ul
              id="icons-navs"
              className="nav-content collapse"
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <Link
                  to="/manage/products"
                  className={isActive("/manage/products") ? "active" : ""}
                >
                  <i className="bi bi-circle" />
                  <span>Product</span>
                </Link>
              </li>
            
            </ul>
          </li>

          <li className="nav-item">
            <Link
              className={`nav-link ${
                isActive("/manage/coursel") ? "active" : "collapsed"
              }`}
              to="/manage/coursel"
            >
              <i className="bi bi-envelope"></i>
              <span>Coursel Manage</span>
            </Link>
          </li>

          

          <li className="nav-item">
            <Link
              className={`nav-link ${
                isActive("/manage/userIssues") ? "active" : "collapsed"
              }`}
              to="/manage/userIssues"
            >
              <i className="bi bi-envelope"></i>
              <span>User Issues</span>
            </Link>
          </li>

         

          <li className="nav-item">
            <Link
              className={`nav-link ${
                isActive("/manage/contact") ? "active" : "collapsed"
              }`}
              to="/manage/contact"
            >
              <i className="bi bi-envelope"></i>
              <span>Contact</span>
            </Link>
          </li>
        </ul>

        <Button
          variant="contained"
          style={{
            backgroundColor: "red", // Herbal green color
            color: "#fff",
            marginTop: "20px",
            borderRadius: "8px",
          }}
          onClick={handleLogout}
        >
          <LogoutIcon />
          <span style={{ marginLeft: "5px" }}>Logout</span>
        </Button>
      </aside>

      {open && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
    </Fragment>
  );
};

export default Sidebar;
