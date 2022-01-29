require("./config/config");
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var sassMiddleware = require("node-sass-middleware");
var session = require("express-session");
const mongoose = require("mongoose");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: parseInt(process.env.SESSION_TIME) },
  })
);
app.use(require("flash")());

app.use(
  sassMiddleware({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    indentedSyntax: true, // true = .sass and false = .scss
    sourceMap: true,
    outputStyle: "compressed",
  })
);

// public directories
app.use("/static", express.static(__dirname + "/node_modules/bootstrap/dist"));
app.use("/static", express.static(__dirname + "/node_modules/font-awesome"));
app.use("/static", express.static(__dirname + "/node_modules/jquery/dist"));
app.use(express.static(path.join(__dirname, "public")));

app.use(require("./routes"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  req.flash("danger", "Page not found");
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// database connection
console.log(process.env.URLDB);
mongoose.connect(process.env.URLDB, (err, res) => {
  if (err) throw err;
  console.log("ONLINE database");
});

module.exports = app;
