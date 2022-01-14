// const MasterController = require("./MasterController");

// class CollectionController extends MasterController {
const { crudAppRoutes, getRoute } = require("../utils/helpers");
const mainPath = "/admin/collections";
const paths = crudAppRoutes(mainPath);

console.log(paths);

// constructor() {
//   super();
//   this.setRoutes();
//   console.log("GET index", this.getRoute("index"));
//   // console.log("GET create", this.getRoute("create"));
//   // console.log("POST store", this.getRoute("store"));
//   // console.log("GET edit", this.getRoute("edit", 23));
//   // console.log("POST update", this.getRoute("update", 23));
//   console.log("GET destroy", this.getRoute("destroy", 23));
//   console.log(this);
// }

const index = (req, res) => {
  // let getRoute = this.getRoute;
  // this.setRoutes();
  console.log(paths);

  // console.log("GET index", this.getRoute("index"));
  let data = { title: "Collections" };
  res.render(`collections/index`, data);
};

const create = (req, res) => {
  res.send(`Response from CollectionsController.create`);
};

const store = (req, res) => {
  console.log(getRoute(paths, "destroy", 45));
  console.log(paths);
  res.send(`Response from CollectionsController.store`);
  // res.redirect("/admin/collection");
};

const edit = (req, res) => {
  res.send(`Response from CollectionsController.edit`);
};

const update = (req, res) => {
  res.send(`Response from CollectionsController.update`);
};

const destroy = (req, res) => {
  res.send(`Response from CollectionsController.destroy`);
};
// }

// module.exports = new CollectionController();

module.exports = {
  index,
  create,
  store,
  edit,
  update,
  destroy,
};
