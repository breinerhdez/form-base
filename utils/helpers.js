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
  show: "/:path_name/:id/show", // GET
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
      typeof updatedData[key] !== "object" &&
      !["_id", "createdAt", "updatedAt", "__v"].includes(key)
    ) {
      let field = {
        field: key,
        original: originalData[key],
        updated: updatedData[key],
      };
      updatedFields.push(field);
    } else if (
      typeof updatedData[key] === "object" &&
      !["_id", "createdAt", "updatedAt", "__v"].includes(key) &&
      JSON.stringify(updatedData[key]) !== JSON.stringify(originalData[key])
    ) {
      let updatedDataDiff = diffObjects(updatedData[key], originalData[key]);
      let originalDataDiff = extractOriginalsFromDiff(
        updatedDataDiff,
        originalData[key]
      );
      let field = {
        field: key,
        original: cleanDiff(originalDataDiff),
        updated: cleanDiff(updatedDataDiff),
      };
      updatedFields.push(field);
    }
  }
  return updatedFields;
};

const saveAuditLog = (req, collectionName, originalData, updated, action) => {
  let updatedFields = getDiferencesBetweenObjects(
    originalData,
    JSON.stringify(updated) !== "{}" ? updated.toObject() : updated
  );
  if (updatedFields.length) {
    let logData = {
      collection_name: collectionName,
      user: {
        _id: req.session.user._id,
        email: req.session.user.email,
        name: req.session.user.name,
        rols: req.session.user.rols,
      },
      detail: updatedFields,
      documentId: updated._id,
      action,
      originAction: req.session.originAction,
      sessionId: req.session.sessionId,
    };
    let log = new CoreAuditLogsModel(logData);
    log.save();
  } else if (action == "LOGIN") {
    let logData = {
      collection_name: collectionName,
      user: {
        _id: req.session.user._id,
        email: req.session.user.email,
        name: req.session.user.name,
        rols: req.session.user.rols,
      },
      detail: updatedFields,
      documentId: req.session.user._id,
      action,
      originAction: req.session.originAction,
      sessionId: req.session.sessionId,
    };
    let log = new CoreAuditLogsModel(logData);
    log.save();
  }
};

// datos que están en objA que no están en objB
const diffObjects = (objA, objB) => {
  if (!objB || objB == "undefined") return objA;
  let diff = Array.isArray(objA) ? [] : {};
  for (const key in objA) {
    if (!(key in objB)) {
      diff[key] = objA[key]; // clave nueva
    } else {
      const valA = objA[key];
      const valB = objB[key];
      if (
        typeof valA === "object" &&
        valA !== null &&
        typeof valB === "object" &&
        valB !== null
      ) {
        const nestedDiff = diffObjects(valA, valB);
        if (Object.keys(nestedDiff).length > 0) {
          diff[key] = nestedDiff;
        }
      } else if (valA !== valB) {
        diff[key] = valA;
      }
    }
  }

  return diff;
};

function extractOriginalsFromDiff(diff, objB) {
  if (Array.isArray(diff)) {
    return diff
      .map((item, index) => {
        if (item === null) return undefined; // ignorar sin incluir
        const original = objB?.[index];
        const sub = extractOriginalsFromDiff(item, original);
        return sub;
      })
      .filter((item) => item !== undefined); // limpia nulls
  }

  if (typeof diff === "object" && diff !== null) {
    let result = {};
    for (const key of Object.keys(diff)) {
      const sub = extractOriginalsFromDiff(diff[key], objB?.[key]);
      if (sub !== undefined) {
        result[key] = sub;
      }
    }
    return result;
  }

  // Para valores primitivos cambiados
  return objB;
}

function cleanDiff(value) {
  if (Array.isArray(value)) {
    const cleanedArray = value
      .map(cleanDiff)
      .filter((item) => item !== null && item !== undefined);
    return cleanedArray.length > 0 ? cleanedArray : null;
  }

  if (typeof value === "object" && value !== null) {
    const result = {};
    for (const key in value) {
      const cleaned = cleanDiff(value[key]);
      if (
        cleaned !== null &&
        cleaned !== undefined &&
        !(Array.isArray(cleaned) && cleaned.length === 0) &&
        !(
          typeof cleaned === "object" &&
          !Array.isArray(cleaned) &&
          Object.keys(cleaned).length === 0
        )
      ) {
        result[key] = cleaned;
      }
    }
    return Object.keys(result).length > 0 ? result : null;
  }

  return value;
}

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
