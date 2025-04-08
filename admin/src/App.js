import { Toaster } from "react-hot-toast";
import React from "react";
import './App.css'
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import route from "./Components/Common/Route/Route";
import Login from "./Components/Pages/Login/Login";
import HeaderAllow from "./Components/Common/Layout/HeaderAllow/HeaderAllow";

function App() {

  const [admin,setAdmin]=useState("")
  return (
    <div className="App">
    <BrowserRouter>
            <AppContent setAdmin={setAdmin} admin={admin} />
    </BrowserRouter>
    </div>
  
  );
}


function AppContent({ setAdmin,admin }) {
  const navigate = useNavigate();
 
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const expirationTime = localStorage.getItem("tokenExpiration");
      if (expirationTime && Date.now() > expirationTime) {
        localStorage.removeItem("Username");
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiration");
        setAdmin(null); 
        navigate("/")
      } else {
        setAdmin(token); 
      }
    } else {
      setAdmin(null);
      navigate("/");
    }
  }, [navigate, setAdmin]);

  return (
    <>
      <Toaster
        toastOptions={{
          success: {
            style: {
              duration: 3000,
              background: "green",
              color: "white",
            },
          },
          error: {
            style: {
              duration: 3000,
              background: "red",
              color: "white",
            },
          },
        }}
      />
      {admin === null ? (
        <Login setAdmin={setAdmin} />
      ) : (
        <>
        <HeaderAllow setAdmin={setAdmin}/>
          <Routes>
            {route.map((e, index) => {
              return <Route key={index} path={e.path}   element={React.cloneElement(e.element, { setAdmin })}/>;
            })}
          </Routes>
        </>
      )}
    </>
  );
}



export default App;
