const express = require("express");

const {
  MakePayment,
  CheckPaymentStatus,
  ListFeesData,
  ListAllFeesData,
} = require("../controller/feesController");

const router = express.Router();

router.route("/getallfeedata").get(ListAllFeesData);
router.route("/get-fee").post(ListFeesData);
router.route("/pay-fee").post(MakePayment);
router.route("/status").post(CheckPaymentStatus);

module.exports = router;
