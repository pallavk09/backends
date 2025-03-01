const express = require("express");
const {
  Add,
  Update,
  Get,
  AddSubjectsToClass,
  GetSubjectsToClass,
  UpdateSubjectsToClass,
} = require("../controller/subjectController");
const router = express.Router();

router.route("/get").get(Get);
router.route("/get-subject-to-class").get(GetSubjectsToClass);

router.route("/add").post(Add);
router.route("/update").post(Update);
router.route("/add-subject-to-class").post(AddSubjectsToClass);
router.route("/update-subject-to-class").post(UpdateSubjectsToClass);

module.exports = router;
