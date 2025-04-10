require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const auth = require("../auth/auth");
const Note = require("../models/note.model");

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

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ error: true, msg: "Please enter valid credentials" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(400)
      .json({ error: true, msg: "No account linked with this email address" });
  }

  if (user.password == password) {
    const token = jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    return res.json({ error: false, msg: "Login Successful", email, token });
  } else {
    return res.status(400).json({ error: false, msg: "Invalid password" });
  }
};

const createNote = async (req, auth, res) => {
  const { title, content, tags } = req.body;
  const { user } = req.user;

  if (!title || !content) {
    return res.status(400).json({
      error: true,
      msg: "You have to enter both the note title and content",
    });
  }

  try {
    const note = new Note({
      title,
      content,
      tags: tags || [],
      userId: user._id,
    });
    await note.save();
    return res.json({ error: false, msg: "Note added successfuly" });
  } catch (err) {
    return res.status(500).json({ error: true, msg: "Internal Server Error" });
    console.log(err);
  }
};

module.exports = { hello, createAccount, login, createNote };
