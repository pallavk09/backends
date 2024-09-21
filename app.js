require("dotenv").config({ path: `.env.local`, override: true });
const express = require("express");
const morgan = require("morgan");

const authRouter = require("./routes/authRoutes");
const studentRouter = require("./routes/studentRoutes");
const feeRouter = require("./routes/feeRoutes");

const app = express();

process.on("uncaughtException", function (err) {
  console.log(err);
});

//Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Mouting Routers
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/student", studentRouter);
app.use("/api/v1/fees", feeRouter);

module.exports = app;
