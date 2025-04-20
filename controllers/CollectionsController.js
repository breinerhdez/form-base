const CoreCollectionsModel = require("../models/CoreCollectionsModel");
const { getRoute, saveAuditLog } = require("../utils/helpers");
const lang = require("../utils/lang");

const basePath = "/admin/collections";
var viewData = { getRoute, basePath, title: lang.COLLECTIONS_TITLE, lang };

const breadItems = [
  {
    title: lang.COLLECTIONS_TITLE,
    href: getRoute(basePath, "index"),
  },
];

class CollectionsController {
  async index(req, res) {
    try {
      // clean session data
      req.session.reqData = {};
      let listObjects = await CoreCollectionsModel.find({}, [
        "title",
        "path_name",
        "collection_name",
      ]);
      let data = { ...viewData, listObjects, counter: 0 };
      res.render(`collections/index`, data);
    } catch (error) {
      req.flash("warning", lang.ERROR_500);
      res.redirect(getRoute(basePath, "index"));
    }
  }

  create(req, res) {
    let sessData = req.session.reqData;
    let data = { ...viewData, title: `Crear Entidad`, breadItems, sessData };
    res.render(`collections/create`, data);
  }

  async store(req, res) {
    try {
      // set session data
      req.session.reqData = req.body;
      let newObj = new CoreCollectionsModel(req.body);
      await newObj.save();
      req.flash("success", lang.CRUD_CREATED);

      saveAuditLog(
        req,
        CoreCollectionsModel.collection.name,
        {},
        newObj,
        "CREATE"
      );

      // clean session data
      req.session.reqData = {};
      res.redirect(getRoute(basePath, "index"));
    } catch (error) {
      console.log(error.message);
      if (error.name === "ValidationError") {
        req.flash(
          "danger",
          Object.values(error.errors)
            .map((val) => val.message)
            .join("<br>")
        );
        res.redirect(getRoute(basePath, "create"));
      } else if (error.name === "MongoServerError") {
        console.log(error);
        req.flash("danger", error.message);
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
      let objDb = await CoreCollectionsModel.findById(id);
      if (!objDb) {
        req.flash("info", lang.CRUD_NOT_EXIST);
        return res.redirect(getRoute(basePath, "index"));
      }
      let data = {
        ...viewData,
        title: `Modificar Entidad`,
        breadItems,
        item: objDb,
      };
      res.render(`collections/edit`, data);
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
      let objDb = await CoreCollectionsModel.findById(id);
      if (!objDb) {
        req.flash("info", lang.CRUD_NOT_EXIST);
        return res.redirect(getRoute(basePath, "index"));
      }
      let originalData = { ...objDb.toObject() };

      // update details
      objDb.title = req.body.title;
      objDb.path_name = req.body.path_name;
      objDb.urlToAfterCreate = req.body.urlToAfterCreate;
      // update API options
      const allowServices = {
        list: req.body.list == "Y" ? "Y" : "N",
        getById: req.body.getById == "Y" ? "Y" : "N",
        create: req.body.create == "Y" ? "Y" : "N",
        update: req.body.update == "Y" ? "Y" : "N",
        delete: req.body.delete == "Y" ? "Y" : "N",
      };
      objDb.allow_services = allowServices;
      objDb.showAdmin = req.body.showAdmin ? true : false;
      objDb.publicForm = req.body.publicForm ? true : false;
      // save
      await objDb.save();

      saveAuditLog(
        req,
        CoreCollectionsModel.collection.name,
        originalData,
        objDb,
        "UPDATE"
      );

      req.flash("success", lang.CRUD_UPDATED);
      res.redirect(getRoute(basePath, "index"));
    } catch (error) {
      if (error.name === "MongoServerError") {
        console.log(error);
        req.flash("danger", error.message);
        res.redirect(getRoute(basePath, "index"));
      } else {
        req.flash("warning", lang.ERROR_500);
        res.redirect(getRoute(basePath, "index"));
      }
    }
  }

  async destroy(req, res) {
    try {
      // get params
      const { id } = req.params;
      // validate object existence
      let objDb = await CoreCollectionsModel.findById(id);
      if (!objDb) {
        req.flash("info", lang.CRUD_NOT_EXIST);
        return res.redirect(getRoute(basePath, "index"));
      }
      // delete object
      await CoreCollectionsModel.findByIdAndDelete(id);

      saveAuditLog(
        req,
        CoreCollectionsModel.collection.name,
        {},
        objDb,
        "DELETE"
      );

      req.flash("success", lang.CRUD_DELETED);
      res.redirect(getRoute(basePath, "index"));
    } catch (error) {
      req.flash("warning", lang.ERROR_500);
      res.redirect(getRoute(basePath, "index"));
    }
  }
}
module.exports = CollectionsController;
