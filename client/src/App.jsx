import React from "react";
import Footer from "./components/common/layout/footer/Footer";
import Header from "./components/common/layout/header/Header";
import "./App.css";
import Contact from "./components/Contact/Contact";
import { Routes, Route } from "react-router-dom";
import Profile from "./components/Pages/Home/Profile";
import Logout from "./components/Pages/Home/Logout";
import Customerservice from "./components/Pages/Home/Customerservice";
import Onlineorder from "./components/Pages/Home/Online-order";
import Faq from "./components/Pages/Home/FaQ/Faq";
import Register from "./components/Pages/Home/Regiter/Register";
import Home from "./components/Home/Home";
import About from "./components/about/About";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./Redux/productSlice";
import UserLogin from "./components/User/UserLogin/UserLogin";
import Otp from "./components/User/Otp/Otp";
import { Toaster } from "react-hot-toast";
import { ForgetPassword } from "./components/User/ForgetPassword/ForgetPassword";
import ResetPassword from "./components/User/ResetPassword/ResetPassword";
import { fetchKidProducts } from "./Redux/kidsProductSlice";
import { fetchWomenProducts } from "./Redux/womenProductSlice";
import Products from "./components/Page/Products/Products";
import ProductDetails from "./components/Page/ProductDetails/ProductDetails";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchKidProducts());
    dispatch(fetchWomenProducts());
  }, [dispatch]);

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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<UserLogin />} />
        <Route path="/user/otp" element={<Otp />} />
        <Route path="/user/forgetpassword" element={<ForgetPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        {/* top banner starts*/}

 

        {/*Products and ProductDetails route*/}
        <Route path="/products" element={<Products />} />
        <Route path="/products-details" element={<ProductDetails />} />
        {/* top banner starts*/}

        <Route path="/contact" element={<Contact />} />
        <Route path="/home-about" element={<About />} />
        <Route path="/home-faq" element={<Faq />} />

        {/* top banner ends*/}

        <Route path="/home-profile" element={<Profile />} />

        <Route path="/home-Online-orders" element={<Onlineorder />} />
        <Route path="/customer-service" element={<Customerservice />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </>
  );
}

export default App;
