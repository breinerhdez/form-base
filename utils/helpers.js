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
// TODO: update like getAutocrudRoute
const getRoute = (paths, option, id = null) => {
  return id ? paths[option].replace("/:id", `/${id}`) : paths[option];
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

module.exports = {
  crudAppPatterns,
  crudAppRoutes,
  autoCrudAppPatterns,
  getAutocrudRoute,
  getRoute,
  getAutoCrudBreadItems,
};
