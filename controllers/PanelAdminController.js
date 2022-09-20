const CoreCollectionsModel = require("../models/CoreCollectionsModel");

class PanelAdminController {
  async index(req, res) {
    let collections = await CoreCollectionsModel.find({}).sort({ title: 1 });

    res.render("panelAdmin/index", { title: "Admin", collections });
  }
}

module.exports = PanelAdminController;
