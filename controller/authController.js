const {
  storeOtpInCache,
  validateOtpFromCache,
} = require("../helper/nodecache");

const jwt = require("jsonwebtoken");
const { Query } = require("node-appwrite");
const { SendOtpThroughTwilio } = require("../helper/twilio");
const {
  GetUsers,
  createRegistration,
  GetRegisteredUser,
} = require("../helper/appWrite");
const logger = require("../logger/logger");
const { ExcludeMetaData } = require("../utils/utils");

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
      //Create JWT Token
      const token = jwt.sign({ phone }, process.env.JWT_SECRET, {
        expiresIn: 3600,
      });
      console.log("Printing Token");
      console.log(token);
      // Check if the user already exists
      const existingUser = await GetUsers(phone);
      if (existingUser) {
        console.log("OTP Valid. Existing user: ", existingUser.$id);
        res.cookie("token", token, {
          httpOnly: true,
          secure: true,
          maxAge: 3600000,
        });
        return res.status(200).json({
          status: "SUCCESS",
          message: "User logged in",
          userId: existingUser.$id,
          token: token,
        });
      }

      // If not, create a new Registration
      const newUser = await createRegistration(phone);
      if (newUser) {
        console.log("OTP Valid. New user. $id: ", newUser.$id);
        console.log("OTP Valid. New user. userId: ", newUser.userId);
        res.cookie("token", token, {
          httpOnly: true,
          secure: true,
          maxAge: 3600000,
        });

        return res.status(201).json({
          status: "SUCCESS",
          message: "User registered",
          userId: newUser.userId,
          token: token,
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

module.exports.Logout = async (req, res, next) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ status: "SUCCESS", message: "Logged out" });
  } catch (error) {
    next(error);
  }
};

module.exports.GetRegisteredUser = async (req, res, next) => {
  try {
    const { userId } = req.body;
    console.log("GetRegisteredUser: ------> userId", userId);
    const userList = await GetRegisteredUser(userId);

    if (userList) res.status(200).json({ status: "SUCCESS", user: userList });
    else
      res
        .status(500)
        .json({ status: "FAIL", message: `Failed to fetch Oregistered user` });
  } catch (error) {
    next(error);
  }
};
