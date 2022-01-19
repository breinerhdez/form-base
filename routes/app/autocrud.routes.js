var express = require("express");
var router = express.Router();

const { autoCrudAppPatterns } = require("../../utils/helpers");

const controller = require("../../controllers/AutoCrudController");

router.get(autoCrudAppPatterns.index, controller.index);
router.get(autoCrudAppPatterns.create, controller.create);
router.post(autoCrudAppPatterns.store, controller.store);
router.get(autoCrudAppPatterns.edit, controller.edit);
router.post(autoCrudAppPatterns.update, controller.update);
router.get(autoCrudAppPatterns.destroy, controller.destroy);

module.exports = router;
