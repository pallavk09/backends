const jwt = require("jsonwebtoken");

module.exports.verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token)
    return res.status(401).json({ status: "FAIL", message: "Access Denied" });

  try {
    console.log("**** token ****");
    console.log(token);
    const verified = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET); // Remove "Bearer "
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ status: "FAIL", message: "Invalid Token" });
  }
};
