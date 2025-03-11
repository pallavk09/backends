const express = require("express");
const {
  ListStudents,
  UpdateStudent,
  GetMatchingStudents,
  ListAcademicRecords,
  AddStudent,
  AddNewAcademicRecord,
  ListAcademicRecordStudent,
  ListAcademicRecordClassSection,
  UpdateAcademicRecord,
  UpdateMultipleAcademicRecords,
  GetClassWiseStudentCount,
  GetStopWiseStudentCount,
  GetFeeStatusSummary,
  GetPendingFeeParticulars,
  UpdateFeePayment,
} = require("../controller/studentController");

const router = express.Router();

router.route("/get").get(ListStudents);
router.route("/get-class-student-count").get(GetClassWiseStudentCount);
router.route("/get-stop-student-count").get(GetStopWiseStudentCount);
router.route("/get-fee-summary").get(GetFeeStatusSummary);
router.route("/get-pending-fee-particulars").post(GetPendingFeeParticulars);
router.route("/update-fees-payment").post(UpdateFeePayment);

router.route("/addstudent").post(AddStudent);
router.route("/updatestudent").post(UpdateStudent);
router.route("/get-academic-records").get(ListAcademicRecords);
router.route("/get-academic-record-student").post(ListAcademicRecordStudent);
router
  .route("/get-academic-record-cls-sect")
  .post(ListAcademicRecordClassSection);
router.route("/add-new-academic-record").post(AddNewAcademicRecord);
router.route("/update-academic-record").post(UpdateAcademicRecord);
router
  .route("/update-multiple-academic-records")
  .post(UpdateMultipleAcademicRecords);

// router.route("/create-new").post(CreateNewStudent);
// router.route("/list").post(ListStudents);
// router.route("/update").post(UpdateStudent);
// router.route("/get-students").post(GetMatchingStudents);
// router.route("/add-file").post(UpdateStudent);

module.exports = router;
