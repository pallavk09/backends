const express = require("express");

const {
  MakePayment,
  CheckPaymentStatus,
} = require("../controller/feesController");

const router = express.Router();

router.route("/pay-fee").post(MakePayment);
router.route("/status").post(CheckPaymentStatus);

module.exports = router;
