const app = require("./app");

const port = process.env.PORT || 3000;
console.log("Port is:", process.env.PORT);
app.listen(port, "0.0.0.0", () => {
  console.log(`Appwrite client created. Listening on port: ${port}`);
});
