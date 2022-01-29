var express = require("express");
const { checkSession } = require("../../middlewares/authMiddleware");
var router = express.Router();
var adminRouter = express.Router();

// admin routes
adminRouter.use("/", require("./paneladmin.routes"));
adminRouter.use("/users", require("./users.routes"));
adminRouter.use("/collections", require("./collections.routes"));
adminRouter.use("/fields", require("./fields.routes"));
adminRouter.use("/crud", require("./autocrud.routes"));
// set prefix /admin to admin routes
// set checkSession for admin routes
router.use("/admin", [checkSession], adminRouter);

// public routes
router.use(require("./index.routes"));
router.use("/auth", require("./auth.routes"));

module.exports = router;
