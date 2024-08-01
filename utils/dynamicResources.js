const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CoreCollectionModel = require("../models/CoreCollectionsModel");
const CoreAuditLogsModel = require("../models/CoreAuditLogsModel");

const { getRequest } = require("../middlewares/alsMiddleware");

/**
 * Validate path_name
 * Ganerate Schema from collection fields configuration
 * Generate Model for Schema
 */
let getObjectsAndModel = async (pathName, req) => {
  // get collection object
  let objCrud = await CoreCollectionModel.findOne({ path_name: pathName });
  console.log(objCrud);
  if (!objCrud) {
    req.flash("warning", `Path Name <b>/admin/crud/${pathName}</b> not found.`);
    return false;
  }

  // get dynamic model object
  let dynamicModel = await getDynamicModel(objCrud, req);
  if (!dynamicModel) {
    req.flash("warning", `Path Name <b>/admin/crud/${pathName}</b> not found.`);
    console.log(`Dynamic model not found for /admin/crud/${pathName}`);
    return false;
  }

  return {
    collection: objCrud,
    dynamicModel,
  };
};

let getDynamicModel = async (objCrud, req) => {
  //  collection name
  let collectionName = objCrud.collection_name;
  // dynamic model name
  let modelName = `${collectionName}_${objCrud._id}`;
  // list models
  let modelList = mongoose.modelNames();
  // declare dynamic model variable
  let dynamicModel = null;
  // get schema for collection
  let collectionSchema = await getSchema(objCrud);

  // check if dynamic model exists
  if (!modelList.includes(modelName)) {
    // generate mongoose schema
    let modelSchema = new Schema(collectionSchema, {
      timestamps: true,
    });

    // // Pre middleware to capture the state before saving
    // modelSchema.pre("save", async function (next) {
    //   if (!this.isNew) {
    //     // Only run if the document is not new (i.e., it's being updated)
    //     this._original = await this.constructor.findById(this._id).exec();
    //   }
    //   next();
    // });

    // // Post middleware to determine what was updated
    // modelSchema.post("save", function (doc) {
    //   if (this._original) {
    //     const originalData = this._original.toObject();
    //     const updatedData = doc.toObject();

    //     let updatedFields = [];

    //     for (let key in updatedData) {
    //       if (
    //         updatedData[key] !== originalData[key] &&
    //         !["_id", "createdAt", "updatedAt"].includes(key)
    //       ) {
    //         let field = {
    //           field: key,
    //           original: originalData[key],
    //           updated: updatedData[key],
    //         };
    //         updatedFields.push(field);
    //       }
    //     }

    //     // console.log("Request.user object:", req.user);
    //     // console.log("Updated fields:", updatedFields);
    //     // console.log("Collection Name:", collectionName);
    //     // console.log("Document _id:", originalData._id);

    //     if (updatedFields.length) {
    //       let logData = {
    //         collection_name: collectionName,
    //         user: {
    //           _id: req.session.user._id,
    //           email: req.session.user.email,
    //           name: req.session.user.name,
    //         },
    //         detail: updatedFields,
    //         documentId: originalData._id,
    //         action: "UPDATED",
    //         originAction: req.session.originAction,
    //       };
    //       // console.log(logData);
    //       let log = new CoreAuditLogsModel(logData);
    //       log.save();
    //     }
    //   }
    // });

    // generate mongoose model
    dynamicModel = mongoose.model(modelName, modelSchema, collectionName);
  } else {
    // if dynamic model exists, set that model
    dynamicModel = mongoose.model(modelName);
  }
  return dynamicModel;
};

// build model schema
const getSchema = async (objCrud = null) => {
  let schema = {};
  objCrud.form.fields.forEach((field) => {
    schema[field.name] = {
      type: field.others.config.database_type,
      required: [field.others.rules.required, `${field.label} is required.`],
    };
  });
  return schema;
};

const deleteDynamicModel = async (objCrud) => {
  // dynamic model name
  let modelName = `${objCrud.collection_name}_${objCrud._id}`;
  // delete if dynamic model exists
  if (mongoose.modelNames().includes(modelName)) {
    mongoose.deleteModel(modelName);
  }
};

module.exports = { getObjectsAndModel, deleteDynamicModel };
