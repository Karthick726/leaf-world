exports.logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    return res.status(200).json({ message: "Logged out successfully!" });
  } catch (err) {
    res.status(302).json({
      message: err,
    });
  }
};
