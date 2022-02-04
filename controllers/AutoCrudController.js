const lang = require("../utils/lang");
const Form = require("../lib/form/Form");
const { getObjectsAndModel } = require("../utils/dynamicResources");
const { getAutocrudRoute, getAutoCrudBreadItems } = require("../utils/helpers");

const basePath = "/admin/crud";

var viewData = { getAutocrudRoute, basePath };

const index = async (req, res) => {
  try {
    // get path_name
    let { path_name } = req.params;
    // get main information for colletion by path_name
    let result = await getObjectsAndModel(path_name, req);
    if (!result) {
      return res.redirect("/admin");
    }
    // destructure result query into variables
    let { collection, dynamicModel } = result;

    let collectionObjects = await dynamicModel.find(
      {},
      collection.collectionConfig.projection
    );

    // set view
    let data = {
      ...viewData,
      title: collection.title,
      collection,
      collectionObjects,
    };
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
      return res.redirect("/admin");
    }
    // destructure result query into variables
    let { collection } = result;
    // generate form object
    let objForm = new Form(
      getAutocrudRoute(basePath, "store", collection.path_name),
      collection.form.fields,
      getAutocrudRoute(basePath, "index", collection.path_name)
    );
    // set view
    let data = {
      ...viewData,
      title: "Add",
      collection,
      objForm: await objForm.dsp(),
      breadItems: getAutoCrudBreadItems(basePath, collection),
    };
    res.render("autoCrud/form", data);
  } catch (error) {
    req.flash("warning", lang.ERROR_500);
    res.redirect("/admin");
  }
};

const store = async (req, res) => {
  try {
    // get path_name
    let { path_name, id } = req.params;
    // get main information for colletion by path_name
    let result = await getObjectsAndModel(path_name, req);
    if (!result) {
      return res.redirect("/admin");
    }
    // destructure result query into variables
    let { collection, dynamicModel } = result;

    // create new object
    let newObj = new dynamicModel(req.body);
    // save data
    await newObj.save();

    req.flash("success", lang.CRUD_CREATED);
    res.redirect(getAutocrudRoute(basePath, "index", collection.path_name));
  } catch (error) {
    req.flash("warning", lang.ERROR_500);
    res.redirect("/admin");
  }
};

const edit = async (req, res) => {
  try {
    // get path_name
    let { path_name, id } = req.params;
    // get main information for colletion by path_name
    let result = await getObjectsAndModel(path_name, req);
    if (!result) {
      return res.redirect("/admin");
    }
    // destructure result query into variables
    let { collection, dynamicModel } = result;

    // check if object exists
    let objDb = await dynamicModel.findById(id);
    if (!objDb) {
      req.flash("warning", lang.CRUD_NOT_EXIST);
      return res.redirect(
        getAutocrudRoute(basePath, "index", collection.path_name)
      );
    }

    // generate form object
    let objForm = new Form(
      getAutocrudRoute(basePath, "update", collection.path_name, objDb._id),
      collection.form.fields,
      getAutocrudRoute(basePath, "index", collection.path_name),
      objDb
    );
    // set view
    let data = {
      ...viewData,
      title: "Edit",
      collection,
      objForm: await objForm.dsp(),
      breadItems: getAutoCrudBreadItems(basePath, collection),
    };
    res.render("autoCrud/form", data);
  } catch (error) {
    req.flash("warning", lang.ERROR_500);
    res.redirect("/admin");
  }
};

const update = async (req, res) => {
  try {
    // get path_name
    let { path_name, id } = req.params;
    // get main information for colletion by path_name
    let result = await getObjectsAndModel(path_name, req);
    if (!result) {
      return res.redirect("/admin");
    }
    // destructure result query into variables
    let { collection, dynamicModel } = result;

    // check if object exists
    let objDb = await dynamicModel.findById(id);
    if (!objDb) {
      req.flash("warning", lang.CRUD_NOT_EXIST);
      return res.redirect(
        getAutocrudRoute(basePath, "index", collection.path_name)
      );
    }

    // update object
    let resObj = Object.assign(objDb, req.body);
    // save object
    await resObj.save();

    req.flash("success", lang.CRUD_UPDATED);
    res.redirect(getAutocrudRoute(basePath, "index", collection.path_name));
  } catch (error) {
    req.flash("warning", lang.ERROR_500);
    res.redirect("/admin");
  }
};

const destroy = async (req, res) => {
  try {
    // get path_name
    let { path_name, id } = req.params;
    // get main information for colletion by path_name
    let result = await getObjectsAndModel(path_name, req);
    if (!result) {
      return res.redirect("/admin");
    }

    // destructure result query into variables
    let { collection, dynamicModel } = result;

    // check if object exists
    let objDb = await dynamicModel.findById(id);
    if (!objDb) {
      req.flash("warning", lang.CRUD_NOT_EXIST);
      return res.redirect(
        getAutocrudRoute(basePath, "index", collection.path_name)
      );
    }
    // delete object
    await dynamicModel.findByIdAndDelete(id);
    req.flash("success", lang.CRUD_DELETED);
    res.redirect(getAutocrudRoute(basePath, "index", collection.path_name));
  } catch (error) {
    req.flash("warning", lang.ERROR_500);
    res.redirect("/admin");
  }
};

module.exports = { index, create, store, edit, update, destroy };
