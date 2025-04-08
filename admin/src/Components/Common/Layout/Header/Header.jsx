import React,{Fragment,useState} from "react";
import logo from "../../../../Assets/Images/leafworld/logo.png";
import "./Header.css";
import { Link,useLocation  } from "react-router-dom";
import toast from "react-hot-toast";
import client from "../../Client/Client";
import Sidebar from "../Sidebar/Siderbar";
import admin from "../../../../Assets/Images/profile-img.jpg"

const Header = (props) => {
  const [username, setUsername] = React.useState("");
  const { setAdmin } = props;
  const [openSidebar,setOpenSideBar]= useState(false)
  const location = useLocation();

  const logout =async() => {
    try{
      const res=await client.post("/admins/logout",{},{
        withCredentials:true
      })
      if(res.status===200){
        localStorage.removeItem("token");
        localStorage.removeItem("Username");
        localStorage.removeItem("tokenExpiration");
        setAdmin(null);
      }
    }catch(err){
      console.log(err);
      if (err.response && err.response.status === 401) {
        toast.error("Token is invalid.Login again");
      } else {
        toast.error("Try again");
      }
    }
 
  };

  React.useEffect(() => {
    const user = localStorage.getItem("Username");
      setUsername(user);

      setOpenSideBar(false);
    }, [location]);



  const toggleSidebar=()=>{
    setOpenSideBar(!openSidebar)
  }
  return (
    <Fragment>
    
      <header
        id="header"
        className="header fixed-top d-flex align-items-center"
      >
        <div className="d-flex align-items-center justify-content-between">
          <Link to="/" className="logo d-flex align-items-center">
            <img src={logo} alt="logo" />
            <span className="d-none d-lg-block" style={{color:"#008448"}}>Leaf World Fashion</span>
          </Link>
          <i className="bi bi-list toggle-sidebar-btn show" onClick={toggleSidebar} />
        </div>

        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">
            <li className="nav-item dropdown pe-3">
              <Link
                className="nav-link nav-profile d-flex align-items-center pe-0"
                to="#"
                data-bs-toggle="dropdown"
              >
                <img
                  src={admin}
                  alt="Profile"
                  className="rounded-circle"
                />
                <span
                  className="d-none d-md-block dropdown-toggle ps-2"
                  style={{
                    textTransform: "capitalize",
                  }}
                >
                  {username}
                </span>
              </Link>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li className="dropdown-header">
                  <h6
                    style={{
                      textTransform: "capitalize",
                    }}
                  >
                    {username}
                  </h6>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
            
               

                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link
                    className="dropdown-item d-flex align-items-center"
                    onClick={logout}
                    to="#"
                  >
                    <i className="bi bi-box-arrow-right" />
                    <span>Sign Out</span>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </header>

      <Sidebar open={openSidebar} toggleSidebar={toggleSidebar} setAdmin={setAdmin} />
     
    </Fragment>
  );
};

export default Header;
