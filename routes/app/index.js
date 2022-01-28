var express = require("express");
var router = express.Router();
var adminRouter = express.Router();

adminRouter.use(require("./paneladmin.routes"));
adminRouter.use("/users", require("./users.routes"));
adminRouter.use("/collections", require("./collections.routes"));
adminRouter.use("/fields", require("./fields.routes"));
adminRouter.use("/crud", require("./autocrud.routes"));

router.use(require("./session.routes"));
router.use("/admin", adminRouter);

module.exports = router;
