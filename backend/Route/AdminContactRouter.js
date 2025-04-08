const express = require("express");
const router = express.Router();
const contact=require('../Controller/AdminContactController');
const VerifyToken = require("./VerifyToken/VerifyToken");

router.post('/save-contact',VerifyToken,contact.postContact);

router.get('/get-contact',contact.getContact);


module.exports = router;