const {
  storeOtpInCache,
  validateOtpFromCache,
} = require("../helper/nodecache");

const { SendOtpThroughTwilio } = require("../helper/twilio");
const { GetUsers, createRegistration } = require("../helper/appWrite");
const logger = require("../logger/logger");

module.exports.TestMethod = (req, res) => {
  res.status(200).json({
    status: "Success",
    Message: "Test Call success",
  });
};

module.exports.SendOTP = async (req, res, next) => {
  try {
    const otp = Math.floor(100000 + Math.random() * 900000);
    const message = `Your verification code is ${otp}`;
    logger.info(`OTP Message created: ${message}`);
    const { phone } = req.body;
    storeOtpInCache(phone, otp);
    const result = await SendOtpThroughTwilio(phone, message);
    if (result)
      res
        .status(200)
        .json({ status: "SUCCESS", message: `OTP sent successfully: ${otp}` });
    else
      res.status(500).json({ status: "FAIL", message: `Failed to create OTP` });
  } catch (error) {
    next(error);
  }
};

module.exports.ValidateOtp = async (req, res, next) => {
  try {
    const { phone, otp } = req.body;
    if (validateOtpFromCache(phone, otp)) {
      console.log("OTP validated successfully");
      // Check if the user already exists
      const existingUser = await GetUsers(phone);
      if (existingUser) {
        return res.status(200).json({
          status: "SUCCESS",
          message: "User logged in",
          userId: existingUser.$id,
        });
      }

      // If not, create a new Registration
      const newUser = await createRegistration(phone);
      if (newUser) {
        return res.status(201).json({
          status: "SUCCESS",
          message: "User registered",
          userId: newUser.$id,
        });
      } else {
        return res
          .status(500)
          .json({ status: "FAIL", message: "Error registering user" });
      }
    } else {
      return res
        .status(401)
        .json({ status: "FAIL", message: "OTP validation failed." });
    }
  } catch (error) {
    next(error);
  }
};
