const express = require("express");
const router = express.Router();
const {
  hello,
  createAccount,
  login,
  createNote,
} = require("../controllers/tasks");

router.route("/").get(hello);
router.route("/login").post(login);
router.route("/createAccount").post(createAccount);
router.route("/addNote").post(createNote);

module.exports = router;
