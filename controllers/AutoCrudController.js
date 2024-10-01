const lang = require("../utils/lang");
const Form = require("../lib/form/Form");
const { getObjectsAndModel } = require("../utils/dynamicResources");
const {
  getAutocrudRoute,
  getAutoCrudBreadItems,
  setFlashErrors,
  saveAuditLog,
} = require("../utils/helpers");

const basePath = "/admin/crud";

var viewData = { getAutocrudRoute, basePath };

class AutoCrudController {
  async index(req, res) {
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
  }

  async create(req, res) {
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
      console.log("ERROR: ================================> ",error.message);
      req.flash("warning", lang.ERROR_500);
      res.redirect("/admin");
    }
  }

  async store(req, res) {
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

      saveAuditLog(req, collection.collection_name, {}, newObj, "CREATE");

      // clean session data
      req.session.reqData = {};

      if(collection.urlToAfterCreate != ""){
        console.log(
          "=".repeat(30) +
            ">>> " +
            "Redirect to external URL: " +
            collection.urlToAfterCreate
        );
        res.redirect(collection.urlToAfterCreate);
      }else{
        req.flash("success", lang.CRUD_CREATED);
        res.redirect(getAutocrudRoute(basePath, "index", collection.path_name));
      }
    } catch (error) {
      if (error.name === "ValidationError") {
        setFlashErrors(req, error);
        res.redirect(
          getAutocrudRoute(basePath, "create", collection.path_name)
        );
      } else {
        console.log(error.message);
        req.flash("warning", lang.ERROR_500);
        res.redirect("/admin");
      }
    }
  }

  async edit(req, res) {
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
  }

  async update(req, res) {
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

      let originalData = { ...objDb.toObject() };
      // update object
      let resObj = Object.assign(objDb, req.body);

      // save object
      await resObj.save();

      saveAuditLog(
        req,
        collection.collection_name,
        originalData,
        resObj,
        "UPDATE"
      );

      // clean session data
      req.session.reqData = {};

      req.flash("success", lang.CRUD_UPDATED);
      res.redirect(getAutocrudRoute(basePath, "index", collection.path_name));
    } catch (error) {
      console.log(error.message);
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
  }

  async destroy(req, res) {
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
      
      saveAuditLog(req, collection.collection_name, {}, objDb, "DELETE");

      req.flash("success", lang.CRUD_DELETED);
      res.redirect(getAutocrudRoute(basePath, "index", collection.path_name));
    } catch (error) {
      req.flash("warning", lang.ERROR_500);
      res.redirect("/admin");
    }
  }
}
module.exports = AutoCrudController;
