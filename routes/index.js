var express = require("express");
const ApiAutoCrudController = require("../controllers/ApiAutoCrudController");
const AuthController = require("../controllers/AuthController");
const AutoCrudController = require("../controllers/AutoCrudController");
const CollectionsController = require("../controllers/CollectionsController");
const FieldsConfigController = require("../controllers/FieldsConfigController");
const PaneladminController = require("../controllers/PanelAdminController");
const UserController = require("../controllers/UsersController");
const AuthMiddleware = require("../middlewares/authMiddleware");
const { crudAppPatterns, autoCrudAppPatterns } = require("../utils/helpers");
const ApiDocController = require("../controllers/ApiDocController");
const swaggerUi = require("swagger-ui-express");
const RolsMiddleware = require("../middlewares/rolsMiddleware");

class Router {
  router = express.Router();

  getRoutes() {
    this.getSecureRoutes();
    this.getPublicRoutes();
    this.getApiRoutes();

    return this.router;
  }

  getSecureRoutes() {
    let router = express.Router();

    router.use("/", this.getPanelAdminRoutes());
    router.use("/users", [RolsMiddleware.checkIsAdmin], this.getUsersRoutes());
    router.use(
      "/collections",
      [RolsMiddleware.checkIsCitdev],
      this.getCollectionRoutes()
    );
    router.use(
      "/fields",
      [RolsMiddleware.checkIsCitdev],
      this.getFieldsRoutes()
    );
    router.use("/crud", [RolsMiddleware.checkIsCrud], this.getAutoCrudRoutes());

    let apiDocController = new ApiDocController();
    this.router.use(
      "/admin/api-doc/:path_name",
      [
        AuthMiddleware.checkSession,
        RolsMiddleware.checkIsApiOrCitdev,
        swaggerUi.serve,
      ],
      apiDocController.index
    );

    // set /admin routes
    this.router.use("/admin", [AuthMiddleware.checkSession], router);
  }

  getPublicRoutes() {
    let router = express.Router();
    // set index
    this.router.use(
      "/",
      router.get("/", (req, res) => {
        res.redirect("/admin");
      })
    );
    // Login
    let controller = new AuthController();
    router.get("/login", controller.login);
    router.post("/login", controller.loginProcess);
    router.get("/logout", controller.logout);
    // set /auth routes
    this.router.use("/auth", router);

    // API public routes
    this.router.use("/api/auth", this.getApiAuthRoutes());
  }

  getApiRoutes() {
    let router = express.Router();

    router.use(
      "/crud",
      [RolsMiddleware.checkIsApi],
      this.getApiAutoCrudRoutes()
    );
    // set /api secure routes
    this.router.use("/api", [AuthMiddleware.checkJWT], router);
  }

  getPanelAdminRoutes() {
    let router = express.Router();
    let controller = new PaneladminController();
    router.get("/", controller.index);
    return router;
  }

  getUsersRoutes() {
    let router = express.Router();
    let controller = new UserController();
    router.get(crudAppPatterns.index, controller.index);
    router.get(crudAppPatterns.create, controller.create);
    router.post(crudAppPatterns.store, controller.store);
    router.get(crudAppPatterns.edit, controller.edit);
    router.post(crudAppPatterns.update, controller.update);
    router.get(crudAppPatterns.destroy, controller.destroy);
    return router;
  }

  getCollectionRoutes() {
    let router = express.Router();
    let controller = new CollectionsController();
    router.get(crudAppPatterns.index, controller.index);
    router.get(crudAppPatterns.create, controller.create);
    router.post(crudAppPatterns.store, controller.store);
    router.get(crudAppPatterns.edit, controller.edit);
    router.post(crudAppPatterns.update, controller.update);
    router.get(crudAppPatterns.destroy, controller.destroy);
    return router;
  }

  getFieldsRoutes() {
    let router = express.Router();
    let controller = new FieldsConfigController();
    router.get(crudAppPatterns.show, controller.index);
    router.post(crudAppPatterns.show, controller.update);
    return router;
  }

  getAutoCrudRoutes() {
    let router = express.Router();
    let controller = new AutoCrudController();
    router.get(autoCrudAppPatterns.index, controller.index);
    router.get(autoCrudAppPatterns.create, controller.create);
    router.post(autoCrudAppPatterns.store, controller.store);
    router.get(autoCrudAppPatterns.edit, controller.edit);
    router.post(autoCrudAppPatterns.update, controller.update);
    router.get(autoCrudAppPatterns.destroy, controller.destroy);
    return router;
  }

  getApiAutoCrudRoutes() {
    let router = express.Router();
    let controller = new ApiAutoCrudController();
    router.get(autoCrudAppPatterns.index, controller.index);
    router.post(autoCrudAppPatterns.store, controller.store);
    router.put(autoCrudAppPatterns.update, controller.update);
    router.delete(autoCrudAppPatterns.destroy, controller.destroy);
    router.get(autoCrudAppPatterns.show, controller.show);
    return router;
  }

  getApiAuthRoutes() {
    let router = express.Router();
    let controller = new AuthController();
    router.post("/login", controller.getJWT);
    return router;
  }
}

module.exports = Router;
