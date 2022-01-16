var express = require("express");
var router = express.Router();

// const panelAdmin = require("../../controllers/PaneladminController");

router.get("/", (req, res) => {
  // res.render("index", { title: "AutoCRUD" });
  res.redirect("/admin");
});

module.exports = router;
