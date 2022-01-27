var express = require("express");
var router = express.Router();

router.use("/crud", require("./apiAutocrud.routes"));

module.exports = router;
