require("dotenv").config({ path: `.env.local`, override: true });
const express = require("express");
const morgan = require("morgan");

const authRouter = require("./routes/authRoutes");

const app = express();

process.on("uncaughtException", function (err) {
  console.log(err);
});

//Middlewares
app.use(morgan("dev"));
app.use(express.json());

//Mouting Routers
app.use("/api/v1/auth", authRouter);

module.exports = app;
