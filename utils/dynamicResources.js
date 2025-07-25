const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CoreCollectionModel = require("../models/CoreCollectionsModel");

/**
 * Validate path_name
 * Ganerate Schema from collection fields configuration
 * Generate Model for Schema
 */
let getObjectsAndModel = async (pathName, req) => {
  // get collection object
  let objCrud = await CoreCollectionModel.findOne({ path_name: pathName });
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
  
  // check if dynamic model exists
  if (!modelList.includes(modelName)) {
    // get schema for collection
    let collectionSchema = await getSchema(objCrud);
    // generate mongoose schema
    let modelSchema = new Schema(collectionSchema, {
      timestamps: true,
    });

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
      type: getSchemaFieldType(field.others.config.database_type),
      default: field.default_value,
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

const getSchemaFieldType = (databaseType) => {
  let schemaFieldType;
  switch (databaseType) {
    case "String":
      schemaFieldType = String;
      break;
    case "Number":
      schemaFieldType = Number;
      break;
    case "Boolean":
      schemaFieldType = Boolean;
      break;
    case "[String]": // Caso específico para un array de Strings
      schemaFieldType = [String];
      break;
    case "[Number]": // Caso específico para un array de Number
      schemaFieldType = [Number];
      break;
    case "[Boolean]": // Caso específico para un array de Boolean
      schemaFieldType = [Boolean];
      break;
    default:
      schemaFieldType = String;
      break;
  }
  return schemaFieldType;
};

module.exports = { getObjectsAndModel, deleteDynamicModel };
