const express = require("express");
const router = express.Router();
const { hello, createAccount } = require("../controllers/tasks");

router.route("/").get(hello);
router.route("/createAccount").post(createAccount);

module.exports = router;
