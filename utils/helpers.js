const CoreAuditLogsModel = require("../models/CoreAuditLogsModel");

// Patterns routes for web application
const crudAppPatterns = {
  index: "/", // GET
  create: "/create", // GET
  store: "/", // POST
  edit: "/:id/edit", // GET
  update: "/:id", // POST
  destroy: "/:id", // GET
  show: "/:id", // GET
};

// Patterns routes for autocrud operations
const autoCrudAppPatterns = {
  index: "/:path_name", // GET
  create: "/:path_name/create", // GET
  store: "/:path_name", // POST
  edit: "/:path_name/:id/edit", // GET
  update: "/:path_name/:id", // POST
  destroy: "/:path_name/:id", // GET
  show: "/:path_name/:id", // GET
};

// Application routes for web application
const crudAppRoutes = (main) => {
  return {
    index: main,
    create: `${main}/create`,
    store: `${main}`,
    edit: `${main}/:id/edit`,
    update: `${main}/:id`,
    destroy: `${main}/:id`,
  };
};

// Get route by name option
const getRoute = (basePath, option = "index", id = null) => {
  let route = basePath + crudAppPatterns[option];
  route = id ? route.replace("/:id", `/${id}`) : route;
  return route;
};

// Get route by name option and dynamic path_name for AutoCRUD
const getAutocrudRoute = (basePath, option = "index", path_name, id = null) => {
  let route =
    basePath +
    autoCrudAppPatterns[option].replace("/:path_name", `/${path_name}`);
  route = id ? route.replace("/:id", `/${id}`) : route;
  return route;
};

const getAutoCrudBreadItems = (basePath, collection) => {
  return [
    {
      title: collection.title,
      href: getAutocrudRoute(basePath, "index", collection.path_name),
    },
  ];
};

const getErrorsMap = (error) => {
  return Object.values(error.errors).map((val) => val.message);
};

const setFlashErrors = (req, error) => {
  req.flash("danger", getErrorsMap(error).join("<br>"));
};

const getDiferencesBetweenObjects = (originalData, updatedData) => {
  let updatedFields = [];

  for (let key in updatedData) {
    if (
      updatedData[key] !== originalData[key] &&
      !["_id", "createdAt", "updatedAt", "__v"].includes(key)
    ) {
      let field = {
        field: key,
        original: originalData[key],
        updated: updatedData[key],
      };
      updatedFields.push(field);
    }
  }
  return updatedFields;
};

const saveAuditLog = (req, collectionName, originalData, updated, action) => {
  console.log("saveAuditLog" + "*".repeat(120));
  let updatedFields = getDiferencesBetweenObjects(
    originalData,
    updated.toObject()
  );
  if (updatedFields.length) {
    let logData = {
      collection_name: collectionName,
      user: {
        _id: req.session.user._id,
        email: req.session.user.email,
        name: req.session.user.name,
      },
      detail: updatedFields,
      documentId: updated._id,
      action,
      originAction: req.session.originAction,
    };
    console.log(logData);
    let log = new CoreAuditLogsModel(logData);
    log.save();
  }
};

module.exports = {
  crudAppPatterns,
  crudAppRoutes,
  autoCrudAppPatterns,
  getAutocrudRoute,
  getRoute,
  getAutoCrudBreadItems,
  setFlashErrors,
  getErrorsMap,
  saveAuditLog,
};
