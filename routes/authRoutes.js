const express = require("express");
const {
  TestMethod,
  SendOTP,
  ValidateOtp,
  Logout,
  GetRegisteredUser,
} = require("../controller/authController");

const {
  trycheckIfUserExists,
  trycreateAppwriteUser,
} = require("../helper/appWrite");

const router = express.Router();

router.route("/").get(TestMethod);
router.route("/send-otp").post(SendOTP);
router.route("/validate-otp").post(ValidateOtp);
router.route("/logout").post(Logout);
router.route("/get-registered-user").post(GetRegisteredUser);
// router.route("/check-user").post(trycheckIfUserExists);
// router.route("/create-user").post(trycreateAppwriteUser);

module.exports = router;
