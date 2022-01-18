var express = require("express");
var router = express.Router();

const controller = require("../../controllers/AutoCrudController");

router.get("/:path_name", controller.index);

module.exports = router;
