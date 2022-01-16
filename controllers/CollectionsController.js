const CoreCollectionsModel = require("../models/CoreCollectionsModel");
const { crudAppRoutes, getRoute } = require("../utils/helpers");
const lang = require("../utils/lang");

const paths = crudAppRoutes("/admin/collections");
var viewData = { getRoute, paths, title: "Collections" };

const breadItems = [
  {
    title: "Collections",
    href: getRoute(paths, "index"),
  },
];

const index = async (req, res) => {
  try {
    let listObjects = await CoreCollectionsModel.find({}, [
      "title",
      "path_name",
      "collection_name",
    ]);
    let data = { ...viewData, listObjects, counter: 0 };
    res.render(`collections/index`, data);
  } catch (error) {
    req.flash("warning", lang.ERROR_500);
    res.redirect(getRoute(paths, "index"));
  }
};

const create = (req, res) => {
  let data = { ...viewData, title: `Add Collection`, breadItems };
  res.render(`collections/create`, data);
};

const store = async (req, res) => {
  try {
    let newObj = new CoreCollectionsModel(req.body);
    await newObj.save();
    req.flash("success", lang.CRUD_CREATED);
    res.redirect(getRoute(paths, "index"));
  } catch (error) {
    console.log(error.message);
    if (error.name === "ValidationError") {
      req.flash(
        "danger",
        Object.values(error.errors)
          .map((val) => val.message)
          .join("<br>")
      );
      res.redirect(getRoute(paths, "create"));
    } else {
      req.flash("warning", lang.ERROR_500);
      res.redirect(getRoute(paths, "index"));
    }
  }
};

const edit = async (req, res) => {
  try {
    // get params
    const { id } = req.params;
    // validate object existence
    let objDb = await CoreCollectionsModel.findById(id);
    if (!objDb) {
      req.flash("info", lang.CRUD_NOT_EXIST);
      return res.redirect(getRoute(paths, "index"));
    }
    let data = {
      ...viewData,
      title: `Edit Collection`,
      breadItems,
      item: objDb,
    };
    res.render(`collections/edit`, data);
  } catch (error) {
    console.log(error);
    req.flash("warning", lang.ERROR_500);
    res.redirect(getRoute(paths, "index"));
  }
};

const update = async (req, res) => {
  try {
    // get params
    const { id } = req.params;
    // validate object existence
    let objDb = await CoreCollectionsModel.findById(id);
    if (!objDb) {
      req.flash("info", lang.CRUD_NOT_EXIST);
      return res.redirect(getRoute(paths, "index"));
    }
    // update details
    objDb.title = req.body.title;
    objDb.path_name = req.body.path_name;
    // update API options
    const allowServices = {
      list: req.body.list == "Y" ? "Y" : "N",
      getById: req.body.getById == "Y" ? "Y" : "N",
      create: req.body.create == "Y" ? "Y" : "N",
      update: req.body.update == "Y" ? "Y" : "N",
      delete: req.body.delete == "Y" ? "Y" : "N",
    };
    objDb.allow_services = allowServices;
    // save
    await objDb.save();
    req.flash("success", lang.CRUD_UPDATED);
    res.redirect(getRoute(paths, "index"));
  } catch (error) {
    req.flash("warning", lang.ERROR_500);
    res.redirect(getRoute(paths, "index"));
  }
};

const destroy = async (req, res) => {
  try {
    // get params
    const { id } = req.params;
    // validate object existence
    let objDb = await CoreCollectionsModel.findById(id);
    if (!objDb) {
      req.flash("info", lang.CRUD_NOT_EXIST);
      return res.redirect(getRoute(paths, "index"));
    }
    // delete object
    await CoreCollectionsModel.findByIdAndDelete(id);
    req.flash("success", lang.CRUD_DELETED);
    res.redirect(getRoute(paths, "index"));
  } catch (error) {
    req.flash("warning", lang.ERROR_500);
    res.redirect(getRoute(paths, "index"));
  }
};

module.exports = {
  index,
  create,
  store,
  edit,
  update,
  destroy,
};
