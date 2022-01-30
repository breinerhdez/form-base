const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

// get JSON Web Token
const getJWT = async (req, res) => {
  try {
    // get payload
    let data = req.body;
    // search user by email
    let user = await CoreUsersModel.findOne({ email: data.email });
    // check if object exists
    if (!user) {
      return res.status(400).send(lang.AUTH_INCORRECT_CREDENTIALS);
    }
    // check password
    if (!bcrypt.compareSync(data.password, user.password)) {
      return res.status(400).send(lang.AUTH_INCORRECT_CREDENTIALS);
    }
    // generate JSON Web Token
    let token = jwt.sign({ user }, process.env.JWT_SIGN_SECRET, {
      expiresIn: parseInt(process.env.JWT_EXPIRES_IN),
    });
    // response
    res.json({
      token,
    });
  } catch (error) {
    return res.status(500).send(lang.ERROR_500);
  }
};

module.exports = {
  login,
  loginProcess,
  logout,
  getJWT,
};
