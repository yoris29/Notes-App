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
router.post("/tasks/addNote", auth, createNote);
router.patch("/tasks/edit-note/:noteId", auth, editNote);
router.get("/tasks/all-notes", auth, getNotes);
router.delete("/tasks/delete-note/:noteId", auth, deleteNote);
router.patch("/tasks/update-note-pinned/:noteId", auth, updatePinned);
router.get("/tasks/get-user", auth, getUser);

module.exports = router;
