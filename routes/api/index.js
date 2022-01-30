var express = require("express");

const { checkJWT } = require("../../middlewares/authMiddleware");

var router = express.Router();
var routerJWT = express.Router();

// routes with JWT validation
routerJWT.use("/crud", [checkJWT], require("./apiAutocrud.routes"));
router.use(routerJWT);
// routes without JWT
router.use("/auth", require("./apiAuth.routes"));

module.exports = router;
