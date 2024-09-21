const { createHash } = require("crypto");
const axios = require("axios");

const merchant_id = process.env.MERCHANT_ID;
const salt_key = process.env.SALT_KEY;
const salt_index = process.env.SALT_INDEX;
const phonepe_url = process.env.PHONEPE_URL;

module.exports.Pay = async (userId, transaction_id, mobileNumber, amount) => {
  const data = {
    merchantId: merchant_id,
    merchantTransactionId: transaction_id,
    name: "Pallav",
    // merchantUserId: userId,
    amount: amount,
    redirectUrl: `http://localhost:3002/api/v1/fees/status?id=${transaction_id}`,
    redirectMode: "POST",
    mobileNumber: mobileNumber,
    paymentInstrument: {
      type: "PAY_PAGE",
    },
  };

  const payload = JSON.stringify(data);

  const payload_base64 = Buffer.from(payload).toString("base64");
  const checksum_header_string = payload_base64 + "/pg/v1/pay" + salt_key;
  const sha256 = createHash("sha256")
    .update(checksum_header_string)
    .digest("hex");

  const checksum = sha256 + "###" + salt_index;

  const options = {
    method: "POST",
    url: phonepe_url,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      "X-VERIFY": checksum,
    },
    data: {
      request: payload_base64,
    },
  };

  return options;
};

module.exports.CheckStatus = async (transaction_id) => {
  const merchantTransactionId = transaction_id;
  const merchantId = merchant_id;

  const string =
    `/pg/v1/status/${merchantId}/${merchantTransactionId}` + salt_key;

  const sha256 = createHash("sha256").update(string).digest("hex");
  const checksum = sha256 + "###" + salt_index;

  const options = {
    method: "GET",
    url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${merchantTransactionId}`,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      "X-VERIFY": checksum,
      "X-MERCHANT-ID": `${merchantId}`,
    },
  };

  return options;
};
