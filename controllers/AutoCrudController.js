const lang = require("../utils/lang");
const Form = require("../lib/form/Form");
const { getObjectsAndModel } = require("../utils/dynamicResources");
const {
  getAutocrudRoute,
  getAutoCrudBreadItems,
  setFlashErrors,
} = require("../utils/helpers");

const basePath = "/admin/crud";

var viewData = { getAutocrudRoute, basePath };

const index = async (req, res) => {
  try {
    // clean session data
    req.session.reqData = {};
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
      getAutocrudRoute(basePath, "index", collection.path_name),
      req.session.reqData
    );
    // set view
    let data = {
      ...viewData,
      title: "Add",
      collection,
      objForm: await objForm.dsp(),
      breadItems: getAutoCrudBreadItems(basePath, collection),
    };
    // clean session data
    req.session.reqData = {};
    res.render("autoCrud/form", data);
  } catch (error) {
    req.flash("warning", lang.ERROR_500);
    res.redirect("/admin");
  }
};

const store = async (req, res) => {
  let collection = null;
  try {
    // set session data
    req.session.reqData = req.body;

    // get path_name
    let { path_name, id } = req.params;
    // get main information for colletion by path_name
    let result = await getObjectsAndModel(path_name, req);
    if (!result) {
      return res.redirect("/admin");
    }
    // destructure result query into variables
    let { collection: _collect, dynamicModel } = result;
    collection = _collect;

    // create new object
    let newObj = new dynamicModel(req.body);
    // save data
    await newObj.save();

    // clean session data
    req.session.reqData = {};

    req.flash("success", lang.CRUD_CREATED);
    res.redirect(getAutocrudRoute(basePath, "index", collection.path_name));
  } catch (error) {
    if (error.name === "ValidationError") {
      setFlashErrors(req, error);
      res.redirect(getAutocrudRoute(basePath, "create", collection.path_name));
    } else {
      req.flash("warning", lang.ERROR_500);
      res.redirect("/admin");
    }
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

    let objToForm = objDb;
    if (JSON.stringify(req.session.reqData) != JSON.stringify({})) {
      objToForm = req.session.reqData;
    }

    // generate form object
    let objForm = new Form(
      getAutocrudRoute(basePath, "update", collection.path_name, objDb._id),
      collection.form.fields,
      getAutocrudRoute(basePath, "index", collection.path_name),
      objToForm
    );
    // set view
    let data = {
      ...viewData,
      title: "Edit",
      collection,
      objForm: await objForm.dsp(),
      breadItems: getAutoCrudBreadItems(basePath, collection),
    };

    // clean session data
    req.session.reqData = {};

    res.render("autoCrud/form", data);
  } catch (error) {
    req.flash("warning", lang.ERROR_500);
    res.redirect("/admin");
  }
};

const update = async (req, res) => {
  let collection = null;
  let id = null;
  try {
    // set session data
    req.session.reqData = req.body;
    // get path_name
    let { path_name, id: _id } = req.params;
    id = _id;
    // get main information for colletion by path_name
    let result = await getObjectsAndModel(path_name, req);
    if (!result) {
      return res.redirect("/admin");
    }
    // destructure result query into variables
    let { collection: _collection, dynamicModel } = result;
    collection = _collection;

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

    // clean session data
    req.session.reqData = {};

    req.flash("success", lang.CRUD_UPDATED);
    res.redirect(getAutocrudRoute(basePath, "index", collection.path_name));
  } catch (error) {
    if (error.name === "ValidationError") {
      setFlashErrors(req, error);
      res.redirect(
        getAutocrudRoute(basePath, "edit", collection.path_name, id)
      );
    } else {
      req.flash("warning", lang.ERROR_500);
      res.redirect("/admin");
    }
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
