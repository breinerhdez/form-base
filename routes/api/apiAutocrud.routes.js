var express = require("express");
var router = express.Router();

const { autoCrudAppPatterns } = require("../../utils/helpers");

const controller = require("../../controllers/ApiAutoCrudController");

router.get(autoCrudAppPatterns.index, controller.index);
router.post(autoCrudAppPatterns.store, controller.store);
router.put(autoCrudAppPatterns.update, controller.update);
router.delete(autoCrudAppPatterns.destroy, controller.destroy);
router.get(autoCrudAppPatterns.show, controller.show);

module.exports = router;
