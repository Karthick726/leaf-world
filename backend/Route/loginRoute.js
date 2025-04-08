const express = require("express");
const router = express.Router();
const login=require('../Controller/loginController');

router.post('/login',login.adminLogin);

router.post('/signup',login.addadmin);

router.get('/getlogin',login.getlogin);




module.exports = router;