import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import { IconButton } from "@mui/material";
import { useState } from "react";
import { Fragment } from "react";
import "./Login.css";
import client from "../../Common/Client/Client";
import { useNavigate } from "react-router-dom";
import logo from '../../../Assets/Images/leafworld/logo.png'


const Login = (porps) => {
const {setAdmin}=porps
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({ username: "", password: "" });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate()


  const errorMessage = (fieldName, fieldValue) => {
    let message;
    if (fieldName) {
      if (fieldValue === "") {
        message = "";
      }
    }

    if (fieldName === "username") {
      if (fieldValue.length < 3) {
        message = `${fieldName} is Invalid`;
      } else {
        message = "";
      }
    }
    if (fieldName === "password") {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(fieldValue)) {
        message = `${fieldName} is Invalid`;
      } else {
        message = "";
      }
    }
    return { message: message };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const err = errorMessage(name, value).message;

    setError((prevError) => ({
      ...prevError,
      [name]: err,
    }));
    if (name === "username") {
      setUsername(value);
    } else {
      setPassword(value);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (value === "") {
      setError((prevError) => ({
        ...prevError,
        [name]: `${name} is required`,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "" || password === "") {
      setError((prevError) => ({
        ...prevError,
        username: "username is required",
        password: "password is required",
      }));
      setUsername("");
      setPassword("");
    } else if (error.username !== "" && error.password !== "") {
      setError((prevError) => ({
        ...prevError,
        username: "username is required",
        password: "password is required",
      }));
      setUsername("");
      setPassword("");
    } else {
     login()
    }
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const login= async()=>{
    try {
      const response=await client.post('/admin/login',{username,password},{
        withCredentials: true,
      });
      if(response.status===200){
        const user=response.data.user.username
        const token =response.data.token;
        const expirationTime = Date.now() + 30 * 60 * 1000;
          localStorage.setItem("token", token);
          localStorage.setItem("Username",user);
          localStorage.setItem("tokenExpiration", expirationTime); 
          setAdmin(token);
          navigate("/");
          setUsername("");
          setPassword("");
          setTimeout(() => {
            console.log("session time out")
            localStorage.removeItem("token");
            localStorage.removeItem("tokenExpiration");
            localStorage.removeItem("Username")
            setAdmin(null);
            navigate("/"); 
          }, 30 * 60 * 1000);
      }
    }catch(err){
      setError((prevError) => ({
                ...prevError,
                username: "username is not valid",
                password: "password is not valid",
              }));
              setUsername("");
              setPassword("");
    }
  }

  return (
    <Fragment>
      <div className="container-fluid full-height-background d-flex justify-content-center align-items-center">
          <div className="overlay" ></div>
          <div className="login-form p-4">
            <div style={{
              marginTop:"10px",
              textAlign:"center            "
            }}>
                <p style={{
                fontSize: "27px",
                color: "#008448",
                margin:"0px",
                textTransform:"uppercase",
                fontWeight:"bold"


              }} className="mb-1">Welcome Admin Panel</p>
              <p style={{
                fontSize: "27px",
                color: "#008448",
                margin:"0px"
              }}><img src={logo} alt="logo" className="mb-1 logo-images"/></p>
            
           

            </div>
            <div>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 2 },
                }}
                noValidate
                autoComplete="off"
              >
              
                  <TextField
                    
              className="form"
              slotProps={{
                htmlInput: {
                  maxLength: 20,
                  autoComplete:"username"
                },
              }}
                    label="Username"
                    variant="standard"
                    name="username"
                    value={username}
                    onChange={handleChange}
                    required
                    onBlur={handleBlur}
                    helperText={error.username ? error.username : ""}
                    error={!!error.username}
                    onKeyDown={(e)=>{
                      const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab'];
                      const allowedCharPattern = /^[0-9A-Za-z_]$/;
                  
                      // Check if the pressed key is not allowed
                      if (!allowedKeys.includes(e.key) && !allowedCharPattern.test(e.key)) {
                        e.preventDefault(); // Prevent the default action of the disallowed key
                      }
                    }}
                    
                  />
                
                  <TextField
                className="form"
                slotProps={{
                  htmlInput: {
                    maxLength: 12,
                    autoComplete:"current-password"
                  },
                  input:{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleClickShowPassword}>
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),

                  }
                }}
                    label="Password"
                    variant="standard"
                    value={password}
                    required

                    type={showPassword ? "text" : "password"}
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={error.password ? error.password : ""}
                    error={!!error.password}
                    onKeyDown={
                      (e)=>{
                        if (e.key === ' ') {
                          e.preventDefault()
                        }
                      }
                    }
                   
                   
                  />
              
                <div className="form-button">
                  <Stack spacing={2} direction="row">
                    <Button variant="contained" onClick={handleSubmit} style={{
                      backgroundColor:"#008448",
                      color:"#fff"
                    }}>
                      Login
                    </Button>
                  </Stack>
                </div>
              </Box>
              </div>
            </div>
          </div>
    </Fragment>
  );
};

export default Login;
