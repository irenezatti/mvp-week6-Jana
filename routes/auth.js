const express = require("express");
const router = express.Router();
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");

router.get("/profile", userShouldBeLoggedIn, function (req, res, next) {
  res.send({
    message: "Here is the PROTECTED data for user " + req.user_id,
  });
});

module.exports = router;