// middleware/alsMiddleware.js
const { AsyncLocalStorage } = require("async_hooks");
const asyncLocalStorage = new AsyncLocalStorage();

module.exports = {
  middleware: (req, res, next) => {
    asyncLocalStorage.run(new Map(), () => {
      asyncLocalStorage.getStore().set("request", req);
      console.log("asigna request:", req.user);
      next();
    });
  },
  getRequest: () => {
    const store = asyncLocalStorage.getStore();
    if (store) {
      console.log("obtiene request");
      return store.get("request");
    }
    console.log("No hay request");
    return null;
  },
};
