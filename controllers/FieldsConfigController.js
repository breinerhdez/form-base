const CoreCollectionsModel = require("../models/CoreCollectionsModel");
const { deleteDynamicModel } = require("../utils/dynamicResources");
const { getRoute } = require("../utils/helpers");
const lang = require("../utils/lang");

var fieldsMainPath = "/admin/fields/";
const basePath = "/admin/collections";
const breadItems = [
  {
    title: "Collections",
    href: getRoute(basePath, "index"),
  },
];
var viewData = { getRoute, basePath, title: "Fields", breadItems };

const index = async (req, res) => {
  // get params
  let { id } = req.params;
  let fieldsPath = fieldsMainPath + id;

  // validate object existence
  let objDb = await CoreCollectionsModel.findById(id);
  if (!objDb) {
    req.flash("info", lang.CRUD_NOT_EXIST);
    return res.redirect(getRoute(basePath, "index"));
  }

  let data = { ...viewData, fieldsPath, collection: objDb };
  res.render(`fieldsConfig/index`, data);
};

const update = async (req, res) => {
  try {
    let { id } = req.params;
    let fieldsPath = fieldsMainPath + id;

    // validate object existence
    let objDb = await CoreCollectionsModel.findById(id);
    if (!objDb) {
      req.flash("info", lang.CRUD_NOT_EXIST);
      return res.redirect(getRoute(basePath, "index"));
    }

    let reqFields = req.body.field;
    let objFields = [];
    let labels = [];
    let others = req.body.others;
    let fieldsProjection = reqFields.projection ? reqFields.projection : [];

    for (let i = 0; i < reqFields.name.length; i++) {
      let field = {
        name: reqFields.name[i],
        type: reqFields.type[i],
        label: reqFields.label[i],
        cols: reqFields.cols[i],
        default_value: reqFields.default_value[i],
        projection: fieldsProjection.includes(reqFields.name[i]),
        others: others[reqFields.name[i]],
      };

      if (fieldsProjection.includes(field.name)) {
        labels.push(field.label);
      }

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

    req.flash("info", "Fields updated");
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
      console.log(error); // TODO clg
      req.flash("warning", lang.ERROR_500);
      res.redirect(getRoute(basePath, "index"));
    }
  }
};

module.exports = { index, update };
