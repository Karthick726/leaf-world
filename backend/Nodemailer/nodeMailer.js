const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "lingamkarthick89@gmail.com",
      pass: "vvmp sehh rvcv hfzp",
    },
  });
  
module.exports=transporter;