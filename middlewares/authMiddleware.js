const jwt = require("jsonwebtoken");

const lang = require("../utils/lang");
const { getObjectsAndModel } = require("../utils/dynamicResources");

class AuthMiddleware {
  // session validator
  static async checkSession(req, res, next) {
    // let isPublic = await AuthMiddleware.validatePublicCrud(req);
    // console.log("isPublic: [" + isPublic + "]");
    // if (isPublic) {
    //   return next();
    // }

    if (!req.session.isLoggedIn) {
      return res.redirect("/auth/login");
    }
    next();
  }

  // JSON Web Token validator
  static async checkJWT(req, res, next) {
    try {
      let token = req.get("Authorization").split(" ")[1];
      let decoded = await jwt.verify(token, process.env.JWT_SIGN_SECRET);
      req.session.user = decoded.user;
      req.session.originAction = "API";
      console.log("checkJWT");
      next();
    } catch (error) {
      return res.status(401).send(lang.ERROR_401);
    }
  }

  static async validatePublicCrud(req) {
    let routeParts = req.originalUrl.split("/");
    console.log("Parts:", routeParts);

    if (
      routeParts[1] != "admin" ||
      routeParts[2] != "crud" ||
      routeParts[4] != "create"
    ) {
      console.log("Ruta diferente");
      return false;
    }

    let pathName = routeParts[3];
    let { collection } = await getObjectsAndModel(pathName, req);

    console.log(
      "Ruta de crear en crud dinámico: path_name ",
      pathName,
      collection.publicForm,
      collection.publicForm === true
    );
    return collection.publicForm;
  }
}

module.exports = AuthMiddleware;
