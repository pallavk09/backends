const express = require("express");
const {
  Add,
  Update,
  Get,
  GetScheduleForClass,
} = require("../controller/examScheduleController");
const router = express.Router();

router.route("/get").get(Get);
router.route("/get-for-class").post(GetScheduleForClass);
router.route("/add").post(Add);
router.route("/update").post(Update);

module.exports = router;
