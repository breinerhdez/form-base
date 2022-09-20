const jwt = require("jsonwebtoken");

const lang = require("../utils/lang");

class AuthMiddleware {
  // session validator
  static checkSession(req, res, next) {
    // return next();
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
      req.user = decoded.user;
      next();
    } catch (error) {
      return res.status(401).send(lang.ERROR_401);
    }
  }
}

module.exports = AuthMiddleware;
