const express = require("express");
const { Add, Update, Get } = require("../controller/classFeeHeadsController");
const router = express.Router();

router.route("/classfee/get").get(Get);
router.route("/classfee/add").post(Add);
router.route("/classfee/update").post(Update);

module.exports = router;
