const auth = require("../auth/auth");
const express = require("express");
const router = express.Router();
const {
  hello,
  createAccount,
  login,
  createNote,
  editNote,
  getNotes,
} = require("../controllers/tasks");

router.route("/").get(hello);
router.route("/login").post(login);
router.route("/createAccount").post(createAccount);
router.post("/addNote", auth, createNote);
router.patch("/edit-note/:noteId", auth, editNote);
router.get("/all-notes", auth, getNotes);

module.exports = router;
