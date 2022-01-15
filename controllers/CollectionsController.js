const CoreCollectionsModel = require("../models/CoreCollectionsModel");
const { crudAppRoutes, getRoute } = require("../utils/helpers");

const paths = crudAppRoutes("/admin/collections");
var viewData = { getRoute, paths, title: "Collections" };

const index = async (req, res) => {
  try {
    let listObjects = await CoreCollectionsModel.find({}, [
      "title",
      "path_name",
      "collection_name",
    ]);
    // console.log(listObjects);
    let data = { ...viewData, listObjects, counter: 0 };
    res.render(`collections/index`, data);
  } catch (error) {
    req.flash("warning", "Internal server error");
    res.redirect(getRoute(paths, "index"));
  }
};

const create = (req, res) => {
  let data = { ...viewData, title: `${viewData.title} - Add New` };
  res.render(`collections/create`, data);
};

const store = async (req, res) => {
  try {
    let newObj = new CoreCollectionsModel(req.body);
    // let number = parseInt(Math.random() * (100 - 0) + 0);
    // let newObj = new CoreCollectionsModel({
    //   title: "Hola mundo " + number,
    //   collection_name: "test_testing" + number,
    //   path_name: "test-testing" + number,
    // });
    await newObj.save();

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
      req.flash("warning", "Internal server error");
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
      req.flash("info", "The object does not exist");
      return res.redirect(getRoute(paths, "index"));
    }
    let data = { ...viewData, title: `${viewData.title} - Edit`, item: objDb };
    res.render(`collections/edit`, data);
  } catch (error) {
    req.flash("warning", "Internal server error");
    res.redirect(getRoute(paths, "index"));
  }
};

const update = (req, res) => {
  res.send(`Response from CollectionsController.update`);
};

const destroy = async (req, res) => {
  try {
    // get params
    const { id } = req.params;
    // validate object existence
    let objDb = await CoreCollectionsModel.findById(id);
    if (!objDb) {
      req.flash("info", "The object does not exist");
      return res.redirect(getRoute(paths, "index"));
    }
    // delete object
    await CoreCollectionsModel.findByIdAndDelete(id);
    req.flash("success", "The object has been deleted");
    res.redirect(getRoute(paths, "index"));
  } catch (error) {
    req.flash("warning", "Internal server error");
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
