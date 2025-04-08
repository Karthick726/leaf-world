import React, { useState, Fragment, useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Radio } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import {
  IconButton,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { MdLockOutline } from "react-icons/md";
import "./Userlogin.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import client from "../../common/Client/Client";
import Loader from "../../common/Loader/Loader";

// import UserProfile from "../../UserProfile/UserProfile";

const UserLogin = () => {
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [signshowPassword, setSignShowPassword] = useState(false);
  const [error, setError] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const navigate = useNavigate();
  const [token, setToken] = useState("");

  useEffect(() => {
    console.log("cookies", Cookies.get("token"));
    if (Cookies.get("token")) {
      navigate("/home-profile");
      setToken(Cookies.get("token"));
    }
  }, [document.cookie]);

  const errorMessage = (fieldName, fieldValue) => {
    let message = "";

    if (fieldName === "email") {
      const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]{2,}@[a-zA-Z-]+\.[a-zA-Z-]{2,}$/;
      if (!emailRegex.test(fieldValue)) {
        message = `Email is Invalid`;
      } else if (fieldValue.length < 3) {
        message = `${fieldName} is Invalid`;
      } else {
        message = "";
      }
    } else if (fieldName === "password") {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(fieldValue)) {
        message = `${fieldName} is Invalid`;
      } else {
        message = "";
      }
    } else if (fieldName === "confirmPassword") {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(fieldValue)) {
        message = `${fieldName} is Invalid`;
      } else if (fieldValue !== password) {
        message = "Passwords do not match";
      } else {
        message = "";
      }
    } else if (fieldName === "username") {
      if (fieldValue.length < 3) {
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

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    } else if (name === "username") {
      setUsername(value);
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

  const handleForgetPassword = () => {
    navigate("/user/forgetpassword");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      if (email === "" || password === "") {
        setError({
          email: "email is required",
          password: "password is required",
        });
        return;
      } else if (error.email !== "" || error.password !== "") {
        setError({
          email: "email is required",
          password: "password is required",
        });
        return;
      }
      setLoading(true);
      login();
    } else {
      if (
        email === "" ||
        password === "" ||
        confirmPassword === "" ||
        username === ""
      ) {
        setError({
          email: email === "" ? "email is required" : "",
          username: username === "" ? "username is required" : "",
          password: password === "" ? "password is required" : "",
          confirmPassword:
            confirmPassword === "" ? "confirm password is required" : "",
        });
        return;
      } else if (error.email !== "") {
        setError((pre) => {
          return {
            ...pre,
            email: "Email is required",
          };
        });
        return;
      } else if (error.password !== "") {
        setError((pre) => {
          return {
            ...pre,
            password: "Password is required",
          };
        });
        return;
      } else if (error.confirmPassword !== "") {
        setError((pre) => {
          return {
            ...pre,
            confirmPassword: "confirmPassword is required",
          };
        });
        return;
      } else if (error.username !== "") {
        setError((pre) => {
          return {
            ...pre,
            username: "Username is required",
          };
        });
        return;
      } else if (!termsAccepted && !isLogin) {
        alert("Please accept the Terms and Conditions.");
        return;
      } else if (password !== confirmPassword) {
        setError({ ...error, confirmPassword: "Passwords do not match" });
        return;
      }
      setLoading(true);
      signup();
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handlesignPassword = () => setSignShowPassword((show) => !show);
  const login = async () => {
    toast.dismiss();
    try {
      const response = await client.post(
        "/user/login",
        { email, password },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        Cookies.set("token", response.data.token, { expires: 7 });
        setEmail("");
        setPassword("");
        setLoading(false);
        toast.success("Login Success!");
        navigate("/");
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
      console.log(err.response.data.message);
      toast.error(err.response.data.message);
    }
  };

  const signup = async () => {
    try {
      const response = await client.post(
        "/user/signup",
        { username, email, password },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        toast.success("Verify your account for active!");
        setOtpSent(true);
        setLoading(false);
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      setLoading(false);
      if (err.response.status === 400) {
        toast.error(err.response.data.message);
      }
      console.log(err);
    }
  };

  return (
    <Fragment>
      <div className="container-fluid full-height-background d-flex justify-content-center align-items-center">
        <div className="overlay"></div>                               
        {!otpSent ? (
          <div className="wrapper">                        
            <div className="login-form ">
              <div style={{ marginTop: "10px", textAlign: "center" }}>
                <MdLockOutline style={{ fontSize: "27px", color: "#000" }} />

                <div className="title-text">
                  <div className={`title active  }`}>
                  {isLogin ? "Login" : "Signup"  }
                  </div>
                 
                </div>
                <div className="form-container">
                  <div className="slide-controls">
                    <FormControlLabel
                      control={
                        <Radio
                            className="radio-login"
                          checked={isLogin}
                          onChange={() => setIsLogin(true)}
                        />
                      }
                      label="Login"
                      className={`slide ${isLogin ? 'Signup' : ''}`}

                    />
                    <FormControlLabel
                      control={
                        <Radio
                        className="radio-login"
                          checked={!isLogin}
                          onChange={() => setIsLogin(false)}
                        />
                      }
                      label="Signup"
                      className={`slide ${isLogin ? '' : 'Signup'}`}
                    />
                    <div
                      className={`slider-tab ${isLogin ? "" : "shift"}`}
                    ></div>
                  </div>
                </div>
              </div>
              <div>
                <Box
                  component="form"
                  sx={{ "& > :not(style)": { m: 2 } }}
                  noValidate
                  autoComplete="off"
                  onSubmit={handleSubmit}
                >
                  {!isLogin && (
                    <TextField
                      id="standard-basic"
                      className="form"
                      label="User Name"
                      variant="standard"
                      name="username"
                      value={username}
                      slotProps={{
                        htmlInput: {
                          maxLength: 20,
                        },
                      }}
                      onChange={handleChange}
                      required
                      onBlur={handleBlur}
                      helperText={error.username ? error.username : ""}
                      error={!!error.username}
                    />
                  )}
                  <TextField
                    id="standard-basic"
                    className="form"
                    label="Email"
                    variant="standard"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    required
                    onBlur={handleBlur}
                    helperText={error.email ? error.email : ""}
                    error={!!error.email}
                    onKeyDown={(e) => {
                      const allowedKeys = [
                        "Backspace",
                        "ArrowLeft",
                        "ArrowRight",
                        "Delete",
                        "Tab",
                      ];
                      const allowedCharPattern = /^[0-9a-z._@-]$/;

                      if (
                        !allowedKeys.includes(e.key) &&
                        !allowedCharPattern.test(e.key)
                      ) {
                        e.preventDefault();
                      }
                    }}
                  />

                  <TextField
                    id="standard-basic"
                    className="form"
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
                    slotProps={{
                      htmlInput: {
                        maxLength: 12,
                      },
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handleClickShowPassword}>
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                  {isLogin && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        width: "90% ",
                        margin: "0px",
                      }}
                    >
                      <p
                        onClick={handleForgetPassword}
                        style={{
                          color: "#007bff",
                          cursor: "pointer",
                        }}
                      >
                        Forget Password?
                      </p>
                    </div>
                  )}
                  {!isLogin && (
                    <>
                      <TextField
                        id="standard-basic"
                        className="form"
                        label="Confirm Password"
                        variant="standard"
                        value={confirmPassword}
                        required
                        type={signshowPassword ? "text" : "password"}
                        name="confirmPassword"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={
                          error.confirmPassword ? error.confirmPassword : ""
                        }
                        error={!!error.confirmPassword}
                        slotProps={{
                          htmlInput: {
                            maxLength: 12,
                          },
                          input: {
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton onClick={handlesignPassword}>
                                  {signshowPassword ? (
                                    <Visibility />
                                  ) : (
                                    <VisibilityOff />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          },
                        }}
                      />
                      <div>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={termsAccepted}
                              onChange={() => setTermsAccepted(!termsAccepted)}
                            />
                          }
                          label="I accept the Terms and Conditions"
                        />
                      </div>
                    </>
                  )}

                  <div
                    className="form-button"
                    style={{
                      margin: "10px 30px",
                    }}
                  >
                    <Button variant="contained" type="submit" fullWidth>
                      {isLogin ? "Login" : "Signup"}
                    </Button>
                  </div>
                  <div style={{ textAlign: "center", marginTop: "15px" }}>
                    <p
                      onClick={() => {
                        setIsLogin((prev) => !prev);
                        setConfirmPassword("");
                        setEmail("");
                        setEmail("");
                        setUsername("");
                        setPassword("");
                        setShowPassword(false);
                        setSignShowPassword(false);
                        setTermsAccepted(false);
                        setError((pre) => {
                          return {
                            ...pre,
                            email: "",
                            username: "",
                            password: "",
                            confirmPassword: "",
                          };
                        });
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      {isLogin ? (
                        <span>
                          Don't have an account?{" "}
                          <span style={{ color: "#007bff" }}>Sign up</span>
                        </span>
                      ) : (
                        <span>
                          Already have an account?{" "}
                          <span style={{ color: "#007bff" }}>Login</span>
                        </span>
                      )}
                    </p>
                  </div>
                </Box>
              </div>
            </div>
          </div>
        ) : (
          navigate("/user/otp", {
            state: {
              email: email,
            },
          })
        )}
      </div>

      {loading && <Loader />}
    </Fragment>
  );
};

export default UserLogin;
