const {
  storeOtpInCache,
  validateOtpFromCache,
} = require("../helper/nodecache");

const { SendOtpThroughTwilio } = require("../helper/twilio");
const { GetUsers, createRegistration } = require("../helper/appWrite");

module.exports.TestMethod = (req, res) => {
  res.status(200).json({
    status: "Success",
    Message: "Test Call success",
  });
};

module.exports.SendOTP = async (req, res) => {
  try {
    const otp = Math.floor(100000 + Math.random() * 900000);
    const message = `Your verification code is ${otp}`;
    const { phone } = req.body;
    storeOtpInCache(phone, otp);
    const result = await SendOtpThroughTwilio(phone, message);
    if (result)
      res
        .status(200)
        .json({ staus: "SUCCESS", message: `OTP sent successfully: ${otp}` });
    else
      res.status(500).json({ staus: "FAIL", message: `Failed to create OTP` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ staus: "FAIL", message: error.message });
  }
};

module.exports.ValidateOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;
    if (validateOtpFromCache(phone, otp)) {
      console.log("OTP validated successfully");
      // Check if the user already exists
      const existingUser = await GetUsers(phone);
      if (existingUser) {
        return res
          .status(200)
          .json({ message: "User logged in", userId: existingUser.$id });
      }

      // If not, create a new Registration
      try {
        const newUser = await createRegistration(phone);
        return res
          .status(200)
          .json({ message: "New registration created", userId: newUser.$id });
      } catch (error) {
        return res.status(500).json({ error: "Failed to create registration" });
      }
    } else {
      return res
        .status(401)
        .json({ status: "FAIL", message: "OTP validation failed." });
    }
  } catch (error) {
    console.log("Error while validating OTP");
    res.status(500).json({ status: "FAIL", message: error.message });
  }
};
