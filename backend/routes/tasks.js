const auth = require("../auth/auth");
const express = require("express");
const router = express.Router();
const {
  getUser,
  createAccount,
  login,
  createNote,
  editNote,
  getNotes,
  deleteNote,
  updatePinned,
} = require("../controllers/tasks");

router.route("/login").post(login);
router.route("/createAccount").post(createAccount);
router.post("/addNote", auth, createNote);
router.patch("/edit-note/:noteId", auth, editNote);
router.get("/all-notes", auth, getNotes);
router.delete("/delete-note/:noteId", auth, deleteNote);
router.patch("/update-note-pinned/:noteId", auth, updatePinned);
router.get("/get-user", auth, getUser);

module.exports = router;
