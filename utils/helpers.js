// Patterns routes for web application
const crudAppPatterns = {
  index: "/",
  create: "/create",
  store: "/",
  edit: "/:id/edit",
  update: "/:id",
  destroy: "/:id",
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
const getRoute = (paths, option, id = null) => {
  return id ? paths[option].replace("/:id", `/${id}`) : paths[option];
};

module.exports = {
  crudAppPatterns,
  crudAppRoutes,
  getRoute,
};
