require("dotenv").config({ path: `.env.local`, override: true });
const express = require("express");
const morgan = require("morgan");
const logger = require("./logger/logger");
// const cors = require("cors");

const authRouter = require("./routes/authRoutes");
const studentRouter = require("./routes/studentRoutes");
const feeRouter = require("./routes/feeRoutes");
const newAdmissionRouter = require("./routes/newAdmissionRoutes");

const app = express();

// Enable CORS for all routes
// app.use(
//   cors({
//     origin: "http://localhost:3000", // Allow only your React app
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow specific methods
//     allowedHeaders: ["Content-Type"], // Allow specific headers
//   })
// );

process.on("uncaughtException", function (err) {
  console.log(err);
});

//Middlewares
// app.use(morgan("dev"));
app.use(
  morgan("combined", {
    stream: { write: (message) => logger.http(message.trim()) },
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Mouting Routers
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/student", studentRouter);
app.use("/api/v1/fees", feeRouter);
app.use("/api/v1/newadmission", newAdmissionRouter);

//Handling unhandled routes
app.all("*", (req, res, next) => {
  const err = new Error(`This route ${req.originalUrl} does not exist`);
  err.status = "FAIL";
  err.statusCode = 404;
  next(err);
});

//Global error handling middleware
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "FAIL";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
