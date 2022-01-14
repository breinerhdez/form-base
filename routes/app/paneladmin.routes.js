var express = require("express");
var router = express.Router();

const controller = require("../../controllers/PaneladminController");

router.get("/", controller.index);

module.exports = router;
