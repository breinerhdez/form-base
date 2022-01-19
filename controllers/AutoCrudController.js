const lang = require("../utils/lang");
const Form = require("../lib/form/Form");
const { getObjectsAndModel } = require("../utils/dynamicResources");
const { getAutocrudRoute } = require("../utils/helpers");

const basePath = "/admin/crud";

var viewData = { getAutocrudRoute, basePath };

const index = async (req, res) => {
  try {
    // get path_name
    let { path_name } = req.params;
    // get main information for colletion by path_name
    let result = await getObjectsAndModel(path_name, req);
    if (!result) {
      res.redirect("/admin");
    }
    // destructure result query into variables
    let { collection } = result;

    // set view
    let data = { ...viewData, title: collection.title, collection };
    res.render("autoCrud/index", data);
  } catch (error) {
    req.flash("warning", lang.ERROR_500);
    res.redirect("/admin");
  }
};

const create = async (req, res) => {
  try {
    // get path_name
    let { path_name } = req.params;
    // get main information for colletion by path_name
    let result = await getObjectsAndModel(path_name, req);
    if (!result) {
      res.redirect("/admin");
    }
    // destructure result query into variables
    let { collection } = result;
    // generate form object
    let objForm = new Form(
      getAutocrudRoute(basePath, "store", collection.path_name),
      collection.form.fields
    );
    // set view
    let data = { ...viewData, title: collection.title, collection, objForm };
    res.render("autoCrud/create", data);
  } catch (error) {
    req.flash("warning", lang.ERROR_500);
    res.redirect("/admin");
  }
};

const store = async (req, res) => {
  try {
    // get path_name
    let { path_name } = req.params;
    // get main information for colletion by path_name
    let result = await getObjectsAndModel(path_name, req);
    if (!result) {
      res.redirect("/admin");
    }
    // destructure result query into variables
    let { collection } = result;

    console.log(req.body);
    req.flash("info", "Data was stored");
    res.redirect(getAutocrudRoute(basePath, "index", collection.path_name));
  } catch (error) {
    req.flash("warning", lang.ERROR_500);
    res.redirect("/admin");
  }
};

const edit = async (req, res) => {
  try {
    // get path_name
    let { path_name } = req.params;
    // get main information for colletion by path_name
    let result = await getObjectsAndModel(path_name, req);
    if (!result) {
      res.redirect("/admin");
    }
    // destructure result query into variables
    let { collection } = result;
    // generate form object
    let objForm = new Form(
      getAutocrudRoute(basePath, "update", collection.path_name, "asdf123"),
      collection.form.fields
    );
    // set view
    let data = {
      ...viewData,
      title: collection.title + "EDIT",
      collection,
      objForm,
    };
    res.render("autoCrud/create", data);
  } catch (error) {
    req.flash("warning", lang.ERROR_500);
    res.redirect("/admin");
  }
};

const update = async (req, res) => {
  try {
    // get path_name
    let { path_name } = req.params;
    // get main information for colletion by path_name
    let result = await getObjectsAndModel(path_name, req);
    if (!result) {
      res.redirect("/admin");
    }
    // destructure result query into variables
    let { collection } = result;

    console.log(req.body);
    req.flash("info", "Data was updated");
    res.redirect(getAutocrudRoute(basePath, "index", collection.path_name));
  } catch (error) {
    req.flash("warning", lang.ERROR_500);
    res.redirect("/admin");
  }
};

const destroy = async (req, res) => {
  try {
    // get path_name
    let { path_name } = req.params;
    // get main information for colletion by path_name
    let result = await getObjectsAndModel(path_name, req);
    if (!result) {
      res.redirect("/admin");
    }
    // destructure result query into variables
    let { collection } = result;

    console.log(req.body);
    req.flash("info", "Data was deleted");
    res.redirect(getAutocrudRoute(basePath, "index", collection.path_name));
  } catch (error) {
    req.flash("warning", lang.ERROR_500);
    res.redirect("/admin");
  }
};

module.exports = { index, create, store, edit, update, destroy };
