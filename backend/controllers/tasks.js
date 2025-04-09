require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const hello = (req, res) => {
  res.json({ data: "Hello" });
};

const createAccount = async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res
      .status(400)
      .json({ error: true, msg: "Please enter all the credentials" });
  }

  const isUser = await User.findOne({ email: email });

  if (isUser) {
    return res.json({
      error: true,
      msg: "A user is already linked with this email address",
    });
  }

  const user = new User({ fullName, email, password });
  await user.save();

  const token = jwt.sign({ fullName }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  return res.json({
    error: false,
    user,
    token,
    msg: "Registration Successful",
  });
};

module.exports = { hello, createAccount };
