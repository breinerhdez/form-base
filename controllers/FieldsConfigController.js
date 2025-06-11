const mongoose = require("mongoose");
const CoreCollectionsModel = require("../models/CoreCollectionsModel");
const { deleteDynamicModel } = require("../utils/dynamicResources");
const { getRoute, saveAuditLog } = require("../utils/helpers");
const lang = require("../utils/lang");

var fieldsMainPath = "/admin/fields/";
const basePath = "/admin/collections";
var basePathCrud = "/admin/crud/";
const basePathCollection = "/admin/collections";
const breadItems = [
  {
    title: lang.COLLECTIONS_TITLE,
    href: getRoute(basePath, "index"),
  },
];
var viewData = {
  getRoute,
  basePath,
  title: lang.FIELDS_APIDOC,
  breadItems,
  lang,
  basePathCollection,
};

class FieldsConfigController {
  // fieldsMainPath = "/admin/fields/";
  async index(req, res) {
    // get params
    let { id } = req.params;
    let fieldsPath = fieldsMainPath + id;

    // validate object existence
    let objDb = await CoreCollectionsModel.findById(id);
    if (!objDb) {
      req.flash("info", lang.CRUD_NOT_EXIST);
      return res.redirect(getRoute(basePath, "index"));
    }

    let collectionList = [];
    if (req.session.user.rols.includes("ADMIN")) {
      collectionList = await CoreCollectionsModel.find({});
    } else {
      collectionList = await CoreCollectionsModel.find({
        $and: [
          {
            $or: [{ allowForAllUsers: true }, { userId: req.session.user._id }],
          },
          {
            _id: { $ne: mongoose.Types.ObjectId(id) },
          },
        ],
      });
    }
    let showCrud = basePathCrud + objDb.path_name;
    let data = {
      ...viewData,
      fieldsPath,
      collection: objDb,
      collectionList,
      basePathCrud: showCrud,
    };
    saveAuditLog(
      req,
      CoreCollectionsModel.collection.name,
      objDb,
      {},
      "CHECKPOINT - Ingresa a configurar campos"
    );
    res.render(`fieldsConfig/index2`, data);
  }

  async update(req, res) {
    let { id } = req.params;
    let fieldsPath = fieldsMainPath + id;
    try {
      // validate object existence
      let objDb = await CoreCollectionsModel.findById(id);
      if (!objDb) {
        req.flash("info", lang.CRUD_NOT_EXIST);
        return res.redirect(getRoute(basePath, "index"));
      }

      let originalData = { ...objDb.toObject() };

      let reqFields = req.body.field;
      let objFields = [];
      let labels = [];
      let body = req.body;
      let fieldsProjection = reqFields.projection ? reqFields.projection : [];

      for (let i = 0; i < reqFields.name.length; i++) {
        let field = {
          name: reqFields.name[i],
          type: reqFields.type[i],
          label: reqFields.label[i],
          cols: reqFields.cols[i],
          default_value: reqFields.default_value[i],
          projection: fieldsProjection.includes(reqFields.name[i]),
        };

        if (fieldsProjection.includes(field.name)) {
          labels.push(field.label);
        }

        field.others = {
          rules: {
            required:
              body.others_rules_required[i] == null ||
              body.others_rules_required[i] == ""
                ? false
                : true,
          },
          config: {
            database_type:
              body.others_config_database_type[i] == null ||
              body.others_config_database_type[i] == ""
                ? "String"
                : body.others_config_database_type[i],
          },
          options: {
            type: body.others_options_type[i],
            values: body.others_options_values[i],
            collection_name: body.others_options_collection_name[i],
          },
        };

        field.cols = "col-md-6";
        objFields.push(field);
      }
      // set attributes
      objDb.collectionConfig.projection = fieldsProjection.join(" ");
      objDb.collectionConfig.labels = labels;
      objDb.form.fields = objFields;
      // save data
      await objDb.save();
      // delete dynamic model
      await deleteDynamicModel(objDb);

      saveAuditLog(
        req,
        CoreCollectionsModel.collection.name,
        originalData,
        objDb,
        "UPDATE"
      );

      req.flash("success", lang.FIELDS_UPDATED);
      res.redirect(fieldsPath);
    } catch (error) {
      if (error.name === "ValidationError") {
        req.flash(
          "danger",
          Object.values(error.errors)
            .map((val) => val.message)
            .join("<br>")
        );
        res.redirect(fieldsPath);
      } else {
        console.log(error.message);
        req.flash("warning", lang.ERROR_500);
        res.redirect(getRoute(basePath, "index"));
      }
    }
  }

  // /admin/fields/getFields/68368f8be1e732896d74358a
  async getFields(req, res) {
    // get params
    let { id } = req.params;

    // validate object existence
    let objDb = await CoreCollectionsModel.findOne({ collection_name: id });
    if (!objDb) {
      console.log("Error on getFields:", lang.CRUD_NOT_EXIST);
      return res.json({ status: false, msg: lang.CRUD_NOT_EXIST });
    }

    let fields = objDb.form.fields.map((item) => {
      return {
        name: item.name,
        label: item.label,
      };
    });

    res.json({ status: true, data: fields });
  }
}
module.exports = FieldsConfigController;
