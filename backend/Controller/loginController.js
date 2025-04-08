const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const loginModel = require("../Schema/loginSchema");
const secreteKey = require("../Config/Config");

exports.adminLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await loginModel.findOne({ username: username });
    console.log(user);
    if (!user) {
      res.status(400).json({ message: err.message });
    }
    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) {
      res.status(400).json({ message: err.message });
    }
    const token = jwt.sign({ id: user._id }, secreteKey, { expiresIn: "5hr" });
    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 600 * 60 * 1000,
      })
      .json({ success: true, token, user });
  } catch (error) {
    res.status(302).json({ message: error.message });
  }
};

exports.addadmin = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    if (!req.body) {
      return res.status(400).json({ message: "Request body is empty" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const signup = new loginModel({ username, password: hashPassword, email });
    await signup.save();
    res.status(201).json(signup);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

exports.getlogin = async (req, res) => {
  try {
    const user = await signupModel.find();

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
