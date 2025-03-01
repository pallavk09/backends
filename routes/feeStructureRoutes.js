const express = require("express");
const {
  GetTransportFeeStructure,
  AddTransportFeeStructure,
  UpdateTransportFeeStructure,
  GetClassFeeStructure,
  AddClassFeeStructure,
  UpdateClassFeeStructure,
} = require("../controller/feeStructureController");

const router = express.Router();

router.route("/get-transport-fee-structure").get(GetTransportFeeStructure);
router.route("/add-transport-fee-structure").post(AddTransportFeeStructure);
router
  .route("/update-transport-fee-structure")
  .post(UpdateTransportFeeStructure);

router.route("/get-Class-fee-structure").get(GetClassFeeStructure);
router.route("/add-Class-fee-structure").post(AddClassFeeStructure);
router.route("/update-Class-fee-structure").post(UpdateClassFeeStructure);

module.exports = router;
