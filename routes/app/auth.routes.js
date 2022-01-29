var express = require("express");
var router = express.Router();

const controller = require("../../controllers/AuthController");

router.get("/login", controller.login);
router.post("/login", controller.loginProcess);
router.get("/logout", controller.logout);

module.exports = router;
