const express = require("express");
const {
  TestMethod,
  SendOTP,
  ValidateOtp,
} = require("../controller/authController");

const {
  trycheckIfUserExists,
  trycreateAppwriteUser,
} = require("../helper/appWrite");

const router = express.Router();

router.route("/").get(TestMethod);
router.route("/send-otp").post(SendOTP);
router.route("/validate-otp").post(ValidateOtp);
// router.route("/check-user").post(trycheckIfUserExists);
// router.route("/create-user").post(trycreateAppwriteUser);

module.exports = router;
