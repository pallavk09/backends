const twilio = require("twilio");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

module.exports.SendOtpThroughTwilio = async (phone, message) => {
  try {
    const result = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    });

    return result;
  } catch (error) {
    throw new Error(
      `Error while sending OTP to user. Error: ${error.message}. Stack: ${error.stack}`
    );
  }
};
