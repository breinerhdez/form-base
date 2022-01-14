const { colors } = require("debug/src/browser");
var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  let data = { title: "Express" };
  // let msg = "";

  // if (req.flash)

  res.render("index", data);
});

router.get("/get-number", function (req, res, next) {
  let number = parseInt(Math.random() * (100 - 0) + 0);

  if (number % 2 == 0) {
    req.flash("success", "My number is " + number);
  } else {
    req.flash("danger", "My number is " + number);
  }

  // req.flash("info", "hello, I was in /users!");
  console.log(number);

  res.redirect("/");
});

module.exports = router;
