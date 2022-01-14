const { crudAppRoutes } = require("../utils/helpers");

class MasterController {
  mainPath = "";
  paths = {};

  constructor() {
    console.log("Master Controller OK");
  }

  setRoutes() {
    this.paths = crudAppRoutes(this.mainPath);
  }
  getRoute(option, id = null) {
    return id
      ? this.paths[option].replace("/:id", `/${id}`)
      : this.paths[option];
  }
}

module.exports = MasterController;
