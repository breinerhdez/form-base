const lang = require("../utils/lang");

class HelpController {
  async paneladmin(req, res) {
    res.render("help/paneladmin/index", {
      title: lang.PANELADMIN_TITLE,
      lang,
      rols: req.session.user.rols,
      pathHelp: "paneladmin",
    });
  }
}

module.exports = HelpController;
