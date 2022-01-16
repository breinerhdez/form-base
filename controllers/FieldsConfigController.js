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
var viewData = { getRoute, paths, title: "Fields Collection", breadItems };

const index = (req, res) => {
  let { id } = req.params;
  let fieldsPath = fieldsMainPath + id;

  let data = { ...viewData, fieldsPath };
  res.render(`fieldsConfig/index`, data);
};

const update = (req, res) => {
  let { id } = req.params;
  let fieldsPath = fieldsMainPath + id;

  req.flash("info", "Fields updated");
  res.redirect(fieldsPath);
};

module.exports = { index, update };
