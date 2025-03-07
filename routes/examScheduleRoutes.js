const express = require("express");
const { Add, Update, Get } = require("../controller/examScheduleController");
const router = express.Router();

router.route("/get").get(Get);
router.route("/add").post(Add);
router.route("/update").post(Update);

module.exports = router;
