const express = require("express");

const {
  MakePayment,
  CheckPaymentStatus,
  ListFeesData,
} = require("../controller/feesController");

const router = express.Router();

router.route("/get-fee").post(ListFeesData);
router.route("/pay-fee").post(MakePayment);
router.route("/status").post(CheckPaymentStatus);

module.exports = router;
