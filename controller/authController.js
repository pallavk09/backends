const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const moment = require("moment");
const { Query } = require("node-appwrite");
const { AddNewDocument, ListAllDocument } = require("../helper/appWrite");

const SECRET_KEY = process.env.APP_SECRET_KEY;

// Decrypt function
const decryptPassword = (encryptedPassword) => {
  const bytes = CryptoJS.AES.decrypt(encryptedPassword, "1234pallaveceFSDwd");

  return bytes.toString(CryptoJS.enc.Utf8);
};

// Register a new user (Admin can manually add users)
module.exports.RegisterNewUser = async (req, res, next) => {
  try {
    const { id, username, password, role } = req.body;
    const updated_on = moment().format("DD/MM/YYYY");

    const newuser = {
      id,
      username,
      password,
      role,
      updated_on,
    };

    const response = await AddNewDocument(
      newuser,
      process.env.APPWRITE_DB_ID,
      process.env.APPWRITE_USERS_COLLECTION
    );

    if (response) {
      return res.status(200).json({
        status: "SUCCESS",
        message: "User registered successfully",
        result: response,
      });
    } else {
      return res
        .status(500)
        .json({ status: "FAIL", message: "User not registered" });
    }
  } catch (error) {
    const err = new Error(
      `Exception. Entry not updated. Error: ${error.message}`
    );
    err.status = "FAIL";
    err.statusCode = 500;

    next(err);
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const users = await ListAllDocument(
      process.env.APPWRITE_DB_ID,
      process.env.APPWRITE_USERS_COLLECTION,
      [Query.equal("username", [username])]
    );

    if (users.total === 0) {
      return res.status(400).json({
        status: "FAIL",
        message: "User not found",
      });
    }

    const user = users.documents[0];

    const password_decryption = decryptPassword(password);
    if (!password_decryption) {
      return res.status(400).json({
        status: "FAIL",
        message: "Invalid credentials",
      });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user.$id, role: user.role },
      process.env.JWT_SECRET
      // { expiresIn: "5m" }
    );
    // res.json({ token, user: { username: user.username, role: user.role } });
    return res.status(200).json({
      status: "SUCCESS",
      message: "User verified",
      token: token,
      user: { username: user.username, role: user.role },
    });
  } catch (error) {
    const err = new Error(
      `Exception. Entry not updated. Error: ${error.message}`
    );
    err.status = "FAIL";
    err.statusCode = 500;

    next(err);
  }
};

// ****************************** UN USED FUNCTIONS ******************************
// const {
//   storeOtpInCache,
//   validateOtpFromCache,
// } = require("../helper/nodecache");

// const jwt = require("jsonwebtoken");
// const { Query } = require("node-appwrite");
// const { SendOtpThroughTwilio } = require("../helper/twilio");
// const {
//   GetUsers,
//   createRegistration,
//   GetRegisteredUser,
// } = require("../helper/appWrite");
// // const logger = require("../logger/logger");
// const { ExcludeMetaData } = require("../utils/utils");

// module.exports.TestMethod = (req, res) => {
//   res.status(200).json({
//     status: "Success",
//     Message: "Test Call success",
//   });
// };

// module.exports.SendOTP = async (req, res, next) => {
//   try {
//     const otp = Math.floor(100000 + Math.random() * 900000);
//     const message = `Your verification code is ${otp}`;
//     // logger.info(`OTP Message created: ${message}`);
//     const { phone } = req.body;
//     storeOtpInCache(phone, otp);
//     //TO BE UNCOMMENTED: START
//     // const result = await SendOtpThroughTwilio(phone, message);
//     // if (result)
//     //TO BE UNCOMMENTED: END
//     if (true)
//       res
//         .status(200)
//         .json({ status: "SUCCESS", message: `OTP sent successfully: ${otp}` });
//     else
//       res.status(500).json({ status: "FAIL", message: `Failed to create OTP` });
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports.ValidateOtp = async (req, res, next) => {
//   try {
//     const { phone, otp, type } = req.body;
//     if (validateOtpFromCache(phone, otp)) {
//       console.log("OTP validated successfully");

//       // console.log("Printing Token");
//       // Check if the user already exists
//       const existingUser = await GetUsers(phone);
//       if (existingUser) {
//         console.log("OTP Valid. Existing user: ", existingUser.$id);

//         //Create JWT Token
//         const token = jwt.sign(
//           { phone: phone, userId: existingUser.$id },
//           process.env.JWT_SECRET,
//           {
//             expiresIn: "2h",
//           }
//         );

//         return res.status(200).json({
//           status: "SUCCESS",
//           message: "User logged in",
//           userId: existingUser.$id,
//           token: token,
//         });
//       }

//       // If not, create a new Registration
//       const newUser = await createRegistration(phone, type);

//       if (newUser) {
//         const _userId =
//           type === "STUDENT"
//             ? newUser.userId
//             : type === "NEWADMISSION"
//             ? newUser.$id
//             : "";

//         console.log("New Registration created. _userId: ", _userId);
//         //Create JWT Token
//         const token = jwt.sign(
//           { phone: phone, userId: _userId },
//           process.env.JWT_SECRET,
//           {
//             expiresIn: "2h",
//           }
//         );

//         return res.status(201).json({
//           status: "SUCCESS",
//           message: "User registered",
//           userId: _userId,
//           token: token,
//         });
//       } else {
//         return res
//           .status(500)
//           .json({ status: "FAIL", message: "Error registering user" });
//       }
//     } else {
//       return res
//         .status(401)
//         .json({ status: "FAIL", message: "OTP validation failed." });
//     }
//   } catch (error) {
//     console.log("Error validating OTP: ", error.message);
//     next(error);
//   }
// };

// module.exports.Logout = async (req, res, next) => {
//   try {
//     res.clearCookie("token");
//     return res.status(200).json({ status: "SUCCESS", message: "Logged out" });
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports.GetRegisteredUser = async (req, res, next) => {
//   try {
//     const { userId } = req.body;
//     console.log("GetRegisteredUser: ------> userId", userId);
//     const userList = await GetRegisteredUser(userId);

//     if (userList) res.status(200).json({ status: "SUCCESS", user: userList });
//     else
//       res
//         .status(500)
//         .json({ status: "FAIL", message: `Failed to fetch Oregistered user` });
//   } catch (error) {
//     next(error);
//   }
// };
