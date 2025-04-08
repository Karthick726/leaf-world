const express = require("express");
const router = express.Router();

const UserRegister = require("../Controller/UserRegister");

router.post("/signup",UserRegister.UserSignUp);
router.post("/otp",UserRegister.verifyOtp);
router.post("/login",UserRegister.userSignIn);
router.post("/resendotp",UserRegister.resendOtp);

router.post("/forgetpassword",UserRegister.forgetPassword);

router.post("/updatePassword",UserRegister.updatePassword)
router.get('/:token',UserRegister.getToken);

module.exports = router;
