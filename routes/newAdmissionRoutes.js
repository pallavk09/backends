const express = require("express");
const {
  CreateNewApplication,
  ListApplications,
} = require("../controller/newAdmissionController");

const router = express.Router();
router.route("/apply").post(CreateNewApplication);
router.route("/list").post(ListApplications);

module.exports = router;
