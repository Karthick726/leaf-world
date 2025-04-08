const mongoose = require("mongoose");

const userRegisterScehma = new mongoose.Schema(
  {
    userName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    phoneNumber: {
      type: String,
    },
    password: {
      type: String,
    },
    active: {
      type: Boolean,
    },
    address: {
      doorno: String,
      street: String,
      landmark: String,
      area: String,
      district: String,
      state: String,
      pincode: String,
    },
    otp: { type: String, required: false },
    otpExpiresAt: {
      type: Number,
      required: false,
    },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
  },
  {
    timestamps: true,
  }
);

//mongoose model
const userRegister = mongoose.model("Users", userRegisterScehma);

module.exports = userRegister;
