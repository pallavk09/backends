const express = require("express");
const {
  CreateNewStudent,
  ListStudents,
  UpdateStudent,
  GetMatchingStudents,
} = require("../controller/studentController");

const router = express.Router();

router.route("/create-new").post(CreateNewStudent);
router.route("/list").post(ListStudents);
router.route("/update").post(UpdateStudent);
// router.route("/get-students").post(GetMatchingStudents);
// router.route("/add-file").post(UpdateStudent);

module.exports = router;
