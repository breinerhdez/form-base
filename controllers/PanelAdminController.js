const CoreCollectionsModel = require("../models/CoreCollectionsModel");
const lang = require("../utils/lang");

class PanelAdminController {
  async index(req, res) {
    let collections = [];

    if (req.session.user.rols.includes("ADMIN")) {
      collections = await CoreCollectionsModel.find({}).sort({ title: 1 });
    } else {
      collections = await CoreCollectionsModel.find({
        userId: req.session.user._id,
      }).sort({ title: 1 });
    }

    res.render("panelAdmin/index", {
      title: lang.PANELADMIN_TITLE,
      collections,
      lang,
      rols: req.session.user.rols,
    });
  }
}

module.exports = PanelAdminController;
