var express = require("express");
var router = express.Router();

router.use("/crud", require("./apiAutocrud.routes"));
router.use("/auth", require("./apiAuth.routes"));

module.exports = router;
