const bcrypt = require("bcrypt");
const _ = require("underscore");

const CoreUsersModel = require("../models/CoreUsersModel");
const { getRoute } = require("../utils/helpers");
const lang = require("../utils/lang");

const basePath = "/admin/users";
var viewData = { getRoute, basePath, title: lang.USERS_TITLE, lang };

const breadItems = [
  {
    title: lang.USERS_TITLE,
    href: getRoute(basePath, "index"),
  },
];

class UserController {
  async index(req, res) {
    try {
      let listObjects = await CoreUsersModel.find({});
      let data = { ...viewData, listObjects, counter: 0 };
      res.render(`users/index`, data);
    } catch (error) {
      req.flash("warning", lang.ERROR_500);
      res.redirect(getRoute(basePath, "index"));
    }
  }

  create(req, res) {
    let data = { ...viewData, title: `Add User`, breadItems };
    res.render(`users/create`, data);
  }

  async store(req, res) {
    try {
      let newObj = new CoreUsersModel(req.body);
      newObj.password = bcrypt.hashSync(req.body.password, 12);
      await newObj.save();
      req.flash("success", lang.CRUD_CREATED);
      res.redirect(getRoute(basePath, "index"));
    } catch (error) {
      if (error.name === "ValidationError") {
        req.flash(
          "danger",
          Object.values(error.errors)
            .map((val) => val.message)
            .join("<br>")
        );
        res.redirect(getRoute(basePath, "create"));
      } else {
        req.flash("warning", lang.ERROR_500);
        res.redirect(getRoute(basePath, "index"));
      }
    }
  }

  async edit(req, res) {
    try {
      // get params
      const { id } = req.params;
      // validate object existence
      let objDb = await CoreUsersModel.findById(id);
      if (!objDb) {
        req.flash("info", lang.CRUD_NOT_EXIST);
        return res.redirect(getRoute(basePath, "index"));
      }
      let data = {
        ...viewData,
        title: `Edit User`,
        breadItems,
        item: objDb,
      };
      res.render(`users/edit`, data);
    } catch (error) {
      req.flash("warning", lang.ERROR_500);
      res.redirect(getRoute(basePath, "index"));
    }
  }

  async update(req, res) {
    try {
      // get params
      const { id } = req.params;
      // validate object existence
      let objDb = await CoreUsersModel.findById(id);
      if (!objDb) {
        req.flash("info", lang.CRUD_NOT_EXIST);
        return res.redirect(getRoute(basePath, "index"));
      }
      // update details
      let body = _.pick(req.body, ["name", "email", "status"]);
      objDb.name = body.name;
      objDb.email = body.email;
      objDb.status = body.status == "Y" ? true : false;

      // save
      await CoreUsersModel.findByIdAndUpdate(id, objDb);

      req.flash("success", lang.CRUD_UPDATED);
      res.redirect(getRoute(basePath, "index"));
    } catch (error) {
      console.log(error);
      req.flash("warning", lang.ERROR_500);
      res.redirect(getRoute(basePath, "index"));
    }
  }

  async destroy(req, res) {
    try {
      // get params
      const { id } = req.params;
      // validate object existence
      let objDb = await CoreUsersModel.findById(id);
      if (!objDb) {
        req.flash("info", lang.CRUD_NOT_EXIST);
        return res.redirect(getRoute(basePath, "index"));
      }
      // delete object
      // await CoreUsersModel.findByIdAndDelete(id);
      objDb.status = false;
      await CoreUsersModel.findByIdAndUpdate(id, objDb);

      req.flash("success", lang.CRUD_DELETED);
      res.redirect(getRoute(basePath, "index"));
    } catch (error) {
      console.log(error);
      req.flash("warning", lang.ERROR_500);
      res.redirect(getRoute(basePath, "index"));
    }
  }
}

module.exports = UserController;
