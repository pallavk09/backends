const express = require("express");

const {
  ListTeachers,
  AddTeacher,
  UpdateTeacher,
} = require("../controller/teachersController");

const router = express.Router();

router.route("/get").get(ListTeachers);
router.route("/addteacher").post(AddTeacher);
router.route("/updateteacher").post(UpdateTeacher);

module.exports = router;
