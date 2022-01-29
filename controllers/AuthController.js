const bcrypt = require("bcrypt");

const lang = require("../utils/lang");
const CoreUsersModel = require("../models/CoreUsersModel");

const login = (req, res) => {
  try {
    let data = { title: "Sign In", showBread: "hide" };
    res.render(`auth/login`, data);
  } catch (error) {
    req.flash("warning", lang.ERROR_500);
    res.redirect("/");
  }
};

const loginProcess = async (req, res) => {
  try {
    // get data
    let data = req.body;
    // get user by email
    let user = await CoreUsersModel.findOne({ email: data.email });
    // validate object existence
    if (!user) {
      req.flash("info", lang.AUTH_INCORRECT_CREDENTIALS);
      return res.redirect("/auth/login");
    }
    // validate password
    if (!bcrypt.compareSync(data.password, user.password)) {
      req.flash("info", lang.AUTH_INCORRECT_CREDENTIALS);
      return res.redirect("/auth/login");
    }
    // user data
    let sessionData = {
      uid: user._id,
      email: user.email,
      name: user.name,
    };
    // set user session data
    req.session.user = sessionData;
    req.session.isLoggedIn = true;
    res.redirect("/admin");
  } catch (error) {
    console.log(error);
    req.flash("warning", lang.ERROR_500);
    res.redirect("/auth/login");
  }
};

const logout = (req, res) => {
  req.session.destroy();
  res.redirect("/");
};

module.exports = {
  login,
  loginProcess,
  logout,
};
