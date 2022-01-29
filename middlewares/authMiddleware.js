let checkSession = (req, res, next) => {
  // return next(); // TODO: borrar
  if (!req.session.isLoggedIn) {
    return res.redirect("/auth/login");
  }
  next();
};

module.exports = {
  checkSession,
};
