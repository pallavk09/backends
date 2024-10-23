const { ListFeesDataForUser } = require("../helper/appWrite");
const { Pay, CheckStatus } = require("../helper/phonePe");
const { CatchAsyncException } = require("../utils/utils");
const axios = require("axios");

module.exports.ListFeesData = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const feesData = await ListFeesDataForUser(userId);
    if (feesData) {
      //Send respone to client
      return res.status(200).json({
        status: "SUCCESS",
        result: feesData,
      });
    } else {
      return res.status(404).json({ status: "SUCCESS", result: [] });
    }
  } catch (error) {
    const err = new Error(
      `Error while fetching fees data. Error: ${error.message}`
    );
    err.status = "FAIL";
    err.statusCode = 500;

    next(err);
  }
};

module.exports.MakePayment = CatchAsyncException(async (req, res) => {
  const { userId, transactionId, phone, amount } = req.body;
  const amount_paise = amount * 100;
  const options = await Pay("MUID123", "t123456", "9999999999", 10000);
  await axios(options)
    .then((response) => {
      res.json(response.data);
    })
    .catch((err) => {
      console.log(err.message);
      res.json({ message: "error while payment" });
    });
});

module.exports.CheckPaymentStatus = CatchAsyncException(async (req, res) => {
  const { transactionId } = req.body;
  const options = await CheckStatus("t123456");
  await axios(options)
    .then((response) => {
      if (response.data.success === true) {
        res.redirect("https://www.google.com/");
      } else {
        res.redirect("https://stackoverflow.com/");
      }
    })
    .catch((err) => {
      console.log(err.message);
      res.json({ message: "error checking status" });
    });
});
