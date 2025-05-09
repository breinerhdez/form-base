const bcrypt = require("bcrypt");
const _ = require("underscore");

const CoreUsersModel = require("../models/CoreUsersModel");
const { getRoute, saveAuditLog } = require("../utils/helpers");
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
      req.session.reqData = {};
      let listObjects = await CoreUsersModel.find({});
      let data = { ...viewData, listObjects, counter: 0 };
      res.render(`users/index`, data);
    } catch (error) {
      req.flash("warning", lang.ERROR_500);
      res.redirect(getRoute(basePath, "index"));
    }
  }

  create(req, res) {
    let data = {
      ...viewData,
      title: lang.USERS_CREATE,
      breadItems,
      dataSession: req.session.reqData,
    };
    req.session.reqData = {};
    res.render(`users/create`, data);
  }

  async store(req, res) {
    try {
      // set session data
      req.session.reqData = req.body;
      let body = _.pick(req.body, [
        "name",
        "email",
        "status",
        "rols",
        "password",
      ]);
      body.status = body.status == "Y" ? true : false;
      let newObj = new CoreUsersModel(body);
      newObj.password = bcrypt.hashSync(req.body.password, 12);
      await newObj.save();
      req.flash("success", lang.CRUD_CREATED);

      saveAuditLog(req, CoreUsersModel.collection.name, {}, newObj, "CREATE");

      req.session.reqData = {};
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

      let objToForm = objDb;
      if (JSON.stringify(req.session.reqData) != JSON.stringify({})) {
        objToForm = req.session.reqData;
        objToForm._id = id;
      }

      let data = {
        ...viewData,
        title: lang.USERS_UPDATE,
        breadItems,
        item: objToForm,
      };
      req.session.reqData = {};
      res.render(`users/edit`, data);
    } catch (error) {
      req.flash("warning", lang.ERROR_500);
      res.redirect(getRoute(basePath, "index"));
    }
  }

  async update(req, res) {
    try {
      // set session data
      req.session.reqData = req.body;
      // get params
      const { id } = req.params;
      // validate object existence
      let objDb = await CoreUsersModel.findById(id);
      if (!objDb) {
        req.flash("info", lang.CRUD_NOT_EXIST);
        return res.redirect(getRoute(basePath, "index"));
      }
      let originalData = { ...objDb.toObject() };
      // update details
      let body = _.pick(req.body, ["name", "email", "status", "rols"]);
      objDb.name = body.name;
      objDb.email = body.email;
      objDb.status = body.status == "Y" ? true : false;
      objDb.rols = !body.rols ? [] : body.rols;

      // save
      await CoreUsersModel.findByIdAndUpdate(id, objDb);

      saveAuditLog(
        req,
        CoreUsersModel.collection.name,
        originalData,
        objDb,
        "UPDATE"
      );

      req.flash("success", lang.CRUD_UPDATED);
      req.session.reqData = {};
      res.redirect(getRoute(basePath, "index"));
    } catch (error) {
      console.log(error);
      // req.flash("warning", lang.ERROR_500);
      // res.redirect(getRoute(basePath, "index"));
      if (error.name === "MongoServerError") {
        let messageReturn = error.message;
        if (messageReturn.includes("duplicate key error collection")) {
          messageReturn = `El correo electrónico ya existe. Debe usar otro correo electrónico.`;
        }
        req.flash("danger", messageReturn);
        return res.redirect(getRoute(basePath, "edit", req.params.id));
      } else {
        req.flash("warning", lang.ERROR_500);
        return res.redirect(getRoute(basePath, "index"));
      }
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
      // objDb.status = false;
      // await CoreUsersModel.findByIdAndUpdate(id, objDb);
      await CoreUsersModel.findByIdAndDelete(id);

      req.flash("success", lang.CRUD_DELETED);

      saveAuditLog(req, CoreUsersModel.collection.name, {}, objDb, "DELETE");

      res.redirect(getRoute(basePath, "index"));
    } catch (error) {
      console.log(error);
      req.flash("warning", lang.ERROR_500);
      res.redirect(getRoute(basePath, "index"));
    }
  }
}

module.exports = UserController;
