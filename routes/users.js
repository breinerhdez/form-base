var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  req.flash("info", "hello, I was in /users!");
  res.render("users");
});

module.exports = router;
