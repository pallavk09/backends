require("dotenv").config({ path: `.env.local`, override: true });
const express = require("express");
const morgan = require("morgan");
// const logger = require("./logger/logger");
const cors = require("cors");

const authRouter = require("./routes/authRoutes");
const studentRouter = require("./routes/studentRoutes");
const feeRouter = require("./routes/feeRoutes");
const newAdmissionRouter = require("./routes/newAdmissionRoutes");
const emailRouter = require("./routes/emailRoutes");

const classRouter = require("./routes/classRoutes");
const sectionRouter = require("./routes/sectionsRoutes");
const subjectRouter = require("./routes/subjectRoutes");
const stopRouter = require("./routes/stopRoutes");
const vehicleRouter = require("./routes/vehicleRoutes");
const feeHeadsRouter = require("./routes/feeHeadsRoutes");
const examRouter = require("./routes/examRoutes");
const feeStructureRouter = require("./routes/feeStructureRoutes");

const app = express();

// Enable CORS for all routes
app.use(
  cors({
    // origin: "*", // Allow only your React app
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow specific methods
    credentials: true,
    // allowedHeaders: ["Content-Type"], // Allow specific headers
  })
);

process.on("uncaughtException", function (err) {
  console.log(err);
});

//Middlewares
// app.use(morgan("dev"));
// app.use(
//   morgan("combined", {
//     stream: { write: (message) => logger.http(message.trim()) },
//   })
// );
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("Connection success"));
app.use("/api/v1/class", classRouter);
app.use("/api/v1/section", sectionRouter);
app.use("/api/v1/subject", subjectRouter);
app.use("/api/v1/stop", stopRouter);
app.use("/api/v1/vehicle", vehicleRouter);
app.use("/api/v1/feeheads", feeHeadsRouter);
app.use("/api/v1/exam", examRouter);
app.use("/api/v1/feestructure", feeStructureRouter);

//Mouting Routers
// app.use("/api/v1/auth", authRouter);
// app.use("/api/v1/student", studentRouter);
// app.use("/api/v1/fees", feeRouter);
// app.use("/api/v1/newadmission", newAdmissionRouter);
// app.use("/api/v1/email", emailRouter);

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
