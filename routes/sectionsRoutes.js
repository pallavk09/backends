const express = require("express");
const {
  Add,
  Update,
  Get,
  AddMultipleSections,
} = require("../controller/sectionController");
const router = express.Router();

router.route("/get").get(Get);
router.route("/add").post(Add);
router.route("/update").post(Update);
router.route("/add-multiple").post(AddMultipleSections);

module.exports = router;
