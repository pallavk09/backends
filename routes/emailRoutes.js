const express = require("express");
const { SendEmail } = require("../controller/emailController");

const router = express.Router();

router.route("/sendemail").get(SendEmail);

module.exports = router;
