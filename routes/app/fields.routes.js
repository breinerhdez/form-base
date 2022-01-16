var express = require("express");
var router = express.Router();

const { crudAppPatterns } = require("../../utils/helpers");

const controller = require("../../controllers/FieldsConfigController");

// basic crud routes
router.get(crudAppPatterns.show, controller.index);
router.post(crudAppPatterns.show, controller.update);

// custom routes

module.exports = router;
