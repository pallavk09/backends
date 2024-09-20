// const redis = require("redis");
// const client = redis.createClient({
//   host: "127.0.0.1",
//   port: "6379",
// });
// client.connect();

const NodeCache = require("node-cache");
const otpCache = new NodeCache({ stdTTL: 300 });
console.log("otpCache created");

// client.on("error", function (err) {
//   console.log("Error " + err);
// });

module.exports.storeOtpInCache = (phoneNumber, otp) => {
  console.log("Inside storeOtpInRedis");
  // await client.setEx(phoneNumber, 300, otp);
  otpCache.set(phoneNumber, otp);
  console.log("OTP store success");
};

module.exports.validateOtpFromCache = (phoneNumber, otp) => {
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
};
