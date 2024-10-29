const express = require("express");
const {
  CreateNewApplication,
  ListApplications,
  ListAllApplications,
  UpdateApplicationStatus,
  ScheduleInterview,
} = require("../controller/newAdmissionController");

const router = express.Router();
router.route("/listall").get(ListAllApplications);
router.route("/apply").post(CreateNewApplication);
router.route("/list").post(ListApplications);
router.route("/update-application-status").post(UpdateApplicationStatus);
router.route("/scheduleinterview").post(ScheduleInterview);

module.exports = router;
