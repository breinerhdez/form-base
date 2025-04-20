const lang = require("../utils/lang");

class RolsMiddleware {
  static async checkIsAdmin(req, res, next) {
    if (!req.session.user.rols.includes("ADMIN")) {
      return await RolsMiddleware.errorResponse(req, res);
    }
    next();
  }

  static async checkIsCitdev(req, res, next) {
    if (!req.session.user.rols.includes("CITDEV")) {
      return await RolsMiddleware.errorResponse(req, res);
    }
    next();
  }

  static async checkIsApi(req, res, next) {
    if (!req.session.user.rols.includes("API")) {
      return await RolsMiddleware.errorResponse(req, res);
    }
    next();
  }

  static async checkIsCrud(req, res, next) {
    if (!req.session.user.rols.includes("CRUD")) {
      return await RolsMiddleware.errorResponse(req, res);
    }
    next();
  }

  static async errorResponse(req, res) {
    console.log("errorResponse");
    let message = "No tiene permiso para acceder a la funcionalidad";
    req.flash("warning", message);
    if (req.session.originAction == "GUI") return res.redirect("/admin");
    else return res.status(401).send(lang.ERROR_401);
  }
}

module.exports = RolsMiddleware;
