require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
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
    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    return res.json({ error: false, msg: "Login Successful", email, token });
  } else {
    return res.status(400).json({ error: false, msg: "Invalid password" });
  }
};

const createNote = async (req, res) => {
  const { title, content, tags } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      error: true,
      msg: "You have to enter both the note title and content",
    });
  }

  try {
    const note = await Note.create({
      title,
      content,
      tags: tags || [],
      userId: req.user._id,
    });
    return res.json({ error: false, msg: "Note added successfuly" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: true, msg: "Internal Server Error" });
  }
};

const editNote = async (req, res) => {
  const { noteId } = req.params;
  const { title, content, tags, isPinned } = req.body;

  if ((!title, !content, !tags)) {
    return res.status(400).json({ error: true, msg: "No changes provided" });
  }

  try {
    const note = await Note.findOneAndUpdate(
      { _id: noteId, userId: req.user._id }, // Filter document
      { title, content, tags, isPinned }, // Updated values
      { new: true, runValidators: true, overwrite: true } // Options
    );

    if (!note) {
      return res.status(404).json({ error: true, msg: "Note not found" });
    }

    return res.json({ err: false, msg: "Note updated successfully", note });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: true, msg: "Internal server error" });
  }
};

const getNotes = async (req, res) => {
  const user = req.user;

  try {
    const notes = await Note.find({ userId: user._id }).sort({ isPinner: -1 });

    if (!notes) {
      return res.json({ err: false, msg: "No notes at the moment" });
    }

    return res.status(200).json({ err: false, notes });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: true, msg: "Internal server error" });
  }
};

module.exports = {
  hello,
  createAccount,
  login,
  createNote,
  editNote,
  getNotes,
};
