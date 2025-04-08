const usermodel = require("../Schema/userRegisterSchema");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const transporter = require("../Nodemailer/nodeMailer");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");

let secreteKey = "leafworld";

function generateOTP() {
  let generateOtp = Math.floor(Math.random() * 1000000);
  generateOtp = generateOtp.toString();
  otps = generateOtp.padStart(6, "0");
  return otps;
}

exports.UserSignUp = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const exist = await usermodel.findOne({ email });

    if (exist && exist.active === true) {
      return res.status(400).json({
        status: "fail",
        error: "Email has already been registered",
      });
    }

    if (!exist) {
      const otp = generateOTP();
      const otpExpiresAt = Date.now() + 5 * 60 * 1000;
      console.log(otp, otpExpiresAt);
      const status = false;
      const newuser = await usermodel.create({
        email,
        userName: username,
        password: await bcrypt.hash(password, 12),
        active: status,
        otp: otp,
        otpExpiresAt: otpExpiresAt,
      });

      const otpTemplate = path.join(
        __dirname,
        "../mailTemplate/emailTemplate.html"
      );

      let otpVerfiy = fs.readFileSync(otpTemplate, "utf8");

      otpVerfiy = otpVerfiy.replace("{email}", email).replace("{otp}", otp);

      const mailOptions = {
        from: "lingamkarthick89@gmail.com",
        to: email,
        subject: "Your OTP Code",
        html: otpVerfiy,
      };

      const info = await transporter.sendMail(mailOptions);

      return res.status(200).json({ status: "success" });
    }

    if (exist && exist.active === false) {
      const otp = generateOTP();

      exist.otp = otp;
      exist.password = await bcrypt.hash(password, 12);
      exist.otpExpiresAt = Date.now() + 5 * 60 * 1000;
      await exist.save();

      const otpTemplate = path.join(
        __dirname,
        "../mailTemplate/emailTemplate.html"
      );

      let otpVerfiy = fs.readFileSync(otpTemplate, "utf8");

      otpVerfiy = otpVerfiy.replace("{email}", email).replace("{otp}", otp);

      const mailOptions = {
        from: "lingamkarthick89@gmail.com",
        to: email,
        subject: "Your OTP Code",
        html: otpVerfiy,
      };

      const info = await transporter.sendMail(mailOptions);

      return res.status(200).json({ status: "success" });
    }
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.verifyOtp = async (req, res, next) => {
  const { otp, email } = req.body;

  try {
    const existingUser = await usermodel.findOne({
      email,
    });

    if (!existingUser) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid User",
      });
    }

    if (Date.now() > existingUser.otpExpiresAt) {
      return res.status(400).json({
        status: "fail",
        message: "OTP has expired. Please request a new OTP.",
      });
    }

    if (otp === existingUser.otp) {
      existingUser.otp = undefined;
      existingUser.otpExpiresAt = undefined;
      existingUser.active = true;
      await existingUser.save();

      const token = jwt.sign({ id: existingUser._id }, secreteKey, {
        expiresIn: "7d",
      });

      return res
        .status(200)
        .cookie("token", token, {
          httpOnly: false,
          secure: true,
          sameSite: "none",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .json({ existingUser, token });
    } else {
      return res.status(400).json({
        status: "fail",
        message: "Invalid OTP, Try Again",
      });
    }
  } catch (error) {
    console.log(error);

    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.resendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!req.body) {
      return res.status(400).json({ message: "Request body is empty" });
    }

    const exist = await usermodel.findOne({ email });

    if (exist && exist.active === true) {
      return res.status(400).json({
        status: "fail",
        error: "Email has already been registered",
      });
    }

    if (!exist) {
      const otp = generateOTP();
      const otpExpiresAt = Date.now() + 5 * 60 * 1000;
      const status = false;

      exist.active = status;
      exist.otp = otp;
      exist.otpExpiresAt = otpExpiresAt;
      await exist.save();
      const otpTemplate = path.join(
        __dirname,
        "../mailTemplate/emailTemplate.html"
      );

      let otpVerfiy = fs.readFileSync(otpTemplate, "utf8");

      otpVerfiy = otpVerfiy.replace("{email}", email).replace("{otp}", otp);

      const mailOptions = {
        from: "lingamkarthick89@gmail.com",
        to: email,
        subject: "Resend OTP Code",
        html: otpVerfiy,
      };

      const info = await transporter.sendMail(mailOptions);
      res.status(200).json({
        message: "OTP sent to your email",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

exports.userSignIn = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const checkUser = await usermodel.findOne({ email }).select("+password");

    if (email === "" || password === "") {
      return res.status(401).json({
        status: "fail",
        message: "Please fill all fields",
      });
    }

    if (checkUser.active === false) {
      return res.status(400).json({
        status: "fail",
        message: "Email is not registered",
      });
    }

    const checkPassword = await bcrypt.compare(password, checkUser.password);

    if (!checkPassword) {
      return res.status(400).json({
        status: "fail",
        message: "Incorrect password.Please try again",
      });
    }

    const token = jwt.sign({ id: checkUser._id }, secreteKey, {
      expiresIn: "7d",
    });

    res
      .status(200)
      .cookie("token", token, {
        httpOnly: false,
        secure: true,
        sameSite: "none",
      })
      .json({ checkUser });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};


exports.forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await usermodel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    } else {
      const restPasswordTemplate = path.join(
        __dirname,
        "../mailTemplate/restPasswordTemplate.html"
      );

      let restpassword = fs.readFileSync(restPasswordTemplate, "utf8");

      const resetToken = crypto.randomBytes(32).toString("hex");

      user.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

      user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 minutes

      await user.save();

      const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

      // Replace placeholders with actual values
      restpassword = restpassword
        .replace("{username}", user.userName) // Replace username placeholder
        .replace("{email}", user.email) // Replace email placeholder
        .replace("{resetUrl}", resetUrl); // Replace resetUrl placeholder

      const mailOptions = {
        to: user.email,
        from: "lingamkarthick89@gmail.com",
        subject: "Password Reset Request",
        html: restpassword,
      };

      await transporter.sendMail(mailOptions);

      res.status(200).json({
        message: `Password reset link sent to ${email}`,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};



exports.getToken = async (req, res) => {
  try {
    const { token } = req.params;

    // Hash the received token before comparing
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await usermodel.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    res.status(200).json(user.email);
  } catch (err) {
    console.error("Error verifying token:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { password, email } = req.body;

    const hashpassword = await bcrypt.hash(password, 10);

    const user = await usermodel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    user.password = hashpassword;
    user.resetPasswordExpires = undefined;
    user.resetPasswordToken = undefined;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Error updating password:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};