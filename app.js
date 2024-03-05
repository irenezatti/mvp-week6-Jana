var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors"); // add at the top

var gameRouter = require("./routes/games");
var authRouter = require("./routes/auth");

var app = express();
app.use(cors()); // add after 'app' is created
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

app.use("/api/games", gameRouter); // -> this will be sent to the backend, doesn't have anything to do with the url in the front (two different localhosts for front and backend)
app.use("/api/auth", authRouter);

module.exports = app;
