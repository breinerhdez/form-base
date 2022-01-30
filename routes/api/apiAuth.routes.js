var express = require("express");
var router = express.Router();

const controller = require("../../controllers/AuthController");

router.post("/login", controller.getJWT);

module.exports = router;
