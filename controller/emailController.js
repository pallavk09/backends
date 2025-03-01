const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);

module.exports.SendEmail = async (req, res, next) => {
  try {
    const mg = mailgun.client({
      username: "api",
      key: "7de2b94abdb00353024c257fb9f34694-d8df908e-82a9996b",
    });

    let msg = await mg.messages.create("sandbox-123.mailgun.org", {
      from: "Excited User <mailgun@eduern.com>",
      to: ["pallavk09@gmail.com"],
      subject: "Hello",
      text: "Testing some Mailgun awesomness!",
      html: "<h1>Testing some Mailgun awesomness!</h1>",
    });
    console.log(msg);
    return res.status(200).json({
      status: "SUCCESS",
      message: "Email Sent",
    });
  } catch (error) {
    const err = new Error(`Error while sending email. Error: ${error.message}`);
    err.status = "FAIL";
    err.statusCode = 500;
    next(error);
  }
};

//const nodemailer = require("nodemailer");

// module.exports.SendEmail = async (req, res, next) => {
//   try {
//     // let testAccount = await nodemailer.createTestAccount();
//     let transporter = nodemailer.createTransport({
//       service: "gmail",
//       //   host: "smtp.ethereal.email",
//       //   port: 587,
//       //   secure: false, // true for port 465, false for other ports
//       auth: {
//         user: "eduern.official@gmail.com",
//         pass: "pallavEduern@2025#",
//       },
//     });

//     const info = await transporter.sendMail({
//       from: "eduern.official@gmail.com", // sender address
//       to: "pallavk09@gmail.com", // list of receivers
//       subject: "Test Email via Node JS", // Subject line
//       text: "Hello world?", // plain text body
//       html: "<b>Hello world?</b>", // html body
//     });
//     console.log("Message sent: %s", info.messageId);

//     return res.status(200).json({
//       status: "SUCCESS",
//       message: "Email Sent",
//     });
//   } catch (error) {
//     const err = new Error(`Error while sending email. Error: ${error.message}`);
//     err.status = "FAIL";
//     err.statusCode = 500;
//     next(error);
//   }
// };
