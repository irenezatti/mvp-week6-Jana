//create endpoint in  backend to test if the TOKEN is valid
// create a separate guard file

var jwt = require("jsonwebtoken");
require("dotenv").config();
const supersecret = process.env.SUPER_SECRET;

router.get("/profile", userShouldBeLoggedIn, function (req, res, next) {
    res.send({
      message: "Here is the PROTECTED data for user " + req.user_id,
    });
  });
  
//function userShouldBeLoggedIn
function userShouldBeLoggedIn(req, res, next) {
  const token = req.headers["authorization"].replace(/^Bearer\s/, "");
  if (!token) {
    res.status(401).send({ message: "please provide a token" });
  } else {
    jwt.verify(token, supersecret, function (err, decoded) {
      if (err) res.status(401).send({ message: err.message });
      else {
        //everything is awesome
        req.user_id = decoded.user_id;
        next();
      }
    });
  }
}

module.exports = userShouldBeLoggedIn;
