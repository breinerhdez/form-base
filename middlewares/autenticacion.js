const jwt = require("jsonwebtoken");

/**
 * Verificar Token
 */
let verificarToken = async (req, res, next) => {
  let token = req.get("token");
  try {
    let decoded = await jwt.verify(token, process.env.JWT_SIGN_SECRET);
    req.usuario = decoded.usuario;
    next();
  } catch (err) {
    return res.status(401).json({
      ok: false,
      err,
    });
  }
};

/**
 * Verificar ADMIN_ROLE
 */
let verificarAdminRole = (req, res, next) => {
  let usuario = req.usuario;
  if (usuario.role === "ADMIN_ROLE") {
    next();
  } else {
    return res.status(401).json({
      ok: false,
      err: {
        message: "El usuario no tiene privilegios para esta operación",
      },
    });
  }
};

let checkSession = (req, res, next) => {
  if (req.session.user) {
    req.session.reload((err) => {
      console.log(err);
    });
    // req.session.cookie.expires = new Date(Date.now() + 5000);
    // req.session.cookie.originalMaxAge = 5000;
    next();
  } else {
    res.redirect("/");
  }
  console.log(req.session);
};

module.exports = {
  verificarToken,
  verificarAdminRole,
  checkSession,
};
