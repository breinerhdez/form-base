var express = require("express");
var router = express.Router();
var adminRouter = express.Router();

adminRouter.use(require("./paneladmin.routes"));

router.use(require("./session.routes"));
router.use("/admin", adminRouter);

module.exports = router;
