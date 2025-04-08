const express = require("express");
const router = express.Router();
const logout=require('../Controller/logoutController');
const VerifyToken = require("./VerifyToken/VerifyToken");



router.post('/logout',VerifyToken,logout.logout);

module.exports = router;