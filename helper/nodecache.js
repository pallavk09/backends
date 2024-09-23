const NodeCache = require("node-cache");
const otpCache = new NodeCache({ stdTTL: 300 });
console.log("otpCache created");

module.exports.storeOtpInCache = (phoneNumber, otp) => {
  try {
    console.log("Inside storeOtpInRedis");
    otpCache.set(phoneNumber, otp);
    console.log("OTP store success");
  } catch (error) {
    throw new Error(
      `Error while storing OTP in cache. Error: ${error.message}. Stack: ${error.stack}`
    );
  }
};

module.exports.validateOtpFromCache = (phoneNumber, otp) => {
  try {
    console.log("Inside validateOtpFromRedis. Fetching OTP");
    // const storedOtp = await client.get(phoneNumber);
    const cachedOtp = otpCache.get(phoneNumber);
    console.log("OTP fetched: ", cachedOtp);
    if (!cachedOtp) {
      console.log("OTP not found");
      return false;
    }
    if (cachedOtp == otp) {
      console.log("OTP matched");
      otpCache.del(phoneNumber);
      return true;
    } else {
      console.log("OTP did matched");
      return false;
    }
  } catch (error) {
    throw new Error(
      `Error while validating OTP. Error: ${error.message}. Stack: ${error.stack}`
    );
  }
};
