require("dotenv").config();
const express = require("express");

const app = express();

app.listen(3002, () => console.log("Listening on port 3002"));
