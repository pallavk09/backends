const { Pay, CheckStatus } = require("../helper/phonePe");
const axios = require("axios");

module.exports.MakePayment = async (req, res) => {
  try {
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
  } catch (error) {
    res.send(500).json({
      status: "FAIL",
      message: error.message,
    });
  }
};

module.exports.CheckPaymentStatus = async (req, res) => {
  try {
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
  } catch (error) {
    res.send(500).json({
      status: "FAIL",
      message: error.message,
    });
  }
};
