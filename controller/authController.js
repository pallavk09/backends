// const account = require("../server");
const twilio = require("twilio");
const {
  storeOtpInRedis,
  validateOtpFromRedis,
} = require("../helper/nodecache");

const { checkIfUserExists, createAppwriteUser } = require("../helper/appWrite");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

module.exports.TestMethod = (req, res) => {
  res.status(200).json({
    status: "Success",
    Message: "Test Call success",
  });
};

module.exports.SendOTP = async (req, res) => {
  try {
    console.log(req.body);
    const otp = Math.floor(100000 + Math.random() * 900000);
    const message = `Your verification code is ${otp}`;
    const { phone } = req.body;
    storeOtpInRedis(phone, otp);
    const result = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio phone number
      to: phone,
    });
    console.log("OTP sent:", result.sid);
    res
      .status(200)
      .json({ staus: "SUCCESS", message: `OTP sent successfully: ${otp}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ staus: "FAIL", message: error.message });
  }
};

module.exports.ValidateOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;
    if (validateOtpFromRedis(phone, otp)) {
      console.log("OTP validated successfully");
      // Check if the user already exists
      const existingUser = await checkIfUserExists(phone);
      if (existingUser) {
        return res
          .status(200)
          .json({ message: "User logged in", userId: existingUser.$id });
      }

      // If not, create a new user
      try {
        const newUser = await createAppwriteUser(phone);
        return res
          .status(200)
          .json({ message: "New user created", userId: newUser.$id });
      } catch (error) {
        return res
          .status(500)
          .json({ error: "Failed to create user in Appwrite" });
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
