const CoreCollectionsModel = require("../models/CoreCollectionsModel");
const { crudAppRoutes, getRoute } = require("../utils/helpers");
const lang = require("../utils/lang");

var fieldsMainPath = "/admin/fields/";
const paths = crudAppRoutes("/admin/collections");
const breadItems = [
  {
    title: "Collections",
    href: getRoute(paths, "index"),
  },
];
var viewData = { getRoute, paths, title: "Fields", breadItems };

const index = async (req, res) => {
  // get params
  let { id } = req.params;
  let fieldsPath = fieldsMainPath + id;

  // validate object existence
  let objDb = await CoreCollectionsModel.findById(id);
  if (!objDb) {
    req.flash("info", lang.CRUD_NOT_EXIST);
    return res.redirect(getRoute(paths, "index"));
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
      return res.redirect(getRoute(paths, "index"));
    }

    let reqFields = req.body.field;
    let objFields = [];
    let labels = [];

    for (let i = 0; i < reqFields.name.length; i++) {
      let field = {
        name: reqFields.name[i],
        type: reqFields.type[i],
        label: reqFields.label[i],
        cols: reqFields.cols[i],
        default_value: reqFields.default_value[i],
        projection: reqFields.projection.includes(reqFields.name[i]),
      };

      if (reqFields.projection.includes(field.name)) {
        labels.push(field.label);
      }

      objFields.push(field);
    }

    objDb.collectionConfig.projection = reqFields.projection.join(" ");
    objDb.collectionConfig.labels = labels;
    objDb.form.fields = objFields;

    await objDb.save();

    req.flash("info", "Fields updated");

    console.log(req.body);
    console.log(objDb);
    console.log(objFields);
    // res.send(JSON.stringify(req.body));

    res.redirect(fieldsPath);
  } catch (error) {
    console.log(error.message);
    if (error.name === "ValidationError") {
      req.flash(
        "danger",
        Object.values(error.errors)
          .map((val) => val.message)
          .join("<br>")
      );
      res.redirect(fieldsPath);
    } else {
      req.flash("warning", lang.ERROR_500);
      res.redirect(getRoute(paths, "index"));
    }
  }
};

module.exports = { index, update };
