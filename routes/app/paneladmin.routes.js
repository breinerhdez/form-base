var express = require("express");
var router = express.Router();

const panelAdmin = require("../../controllers/PaneladminController");

router.get("/", panelAdmin);

module.exports = router;
