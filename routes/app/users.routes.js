var express = require("express");
var router = express.Router();

const { crudAppPatterns } = require("../../utils/helpers");

const controller = require("../../controllers/UsersController");

// basic crud routes
router.get(crudAppPatterns.index, controller.index);
router.get(crudAppPatterns.create, controller.create);
router.post(crudAppPatterns.store, controller.store);
router.get(crudAppPatterns.edit, controller.edit);
router.post(crudAppPatterns.update, controller.update);
router.get(crudAppPatterns.destroy, controller.destroy);

// custom routes

module.exports = router;
