// const express = require("express");
// const app = express();

// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

const CoreCollectionModel = require("../models/CoreCollectionsModel");

/**
 * Validate path_name
 * Ganerate Schema from collection fields configuration
 * Generate Model for Schema
 */
let getObjectsAndModel = async (pathName, req) => {
  let objCrud = await CoreCollectionModel.findOne({ path_name: pathName });
  if (!objCrud) {
    req.flash("warning", `Path Name <b>admin/crud/${pathName}</b> not found.`);
    return false;
  }

  // consultar el formulario
  //   let objFormDb = await CoreFormsModel.findOne({ collection_id: objCrud._id });
  //   if (!objFormDb) {
  //     return false;
  //   }

  /**
   * definición de variables
   */
  //   // nombre de la colección
  //   let collectionName = objCrud.collection_name;
  //   // estructura del esquema
  //   let collectionSchema = objFormDb.config.schema;
  //   // let collectionSchema = objFormDb.schema;
  //   // nombre de la entidad o modelo
  //   let modelName = `${collectionName}_${objCrud._id}`;
  //   // lista de modelos existentes
  //   let modelList = mongoose.modelNames();
  //   // objeto de modelo dinámico
  //   let DynamicModel = null;

  // ajustes al Schema
  //   for (const prop in collectionSchema) {
  //     if (Object.hasOwnProperty.call(collectionSchema, prop)) {
  //       const element = collectionSchema[prop];
  //       if (element.type == "Schema.Types.Mixed") {
  //         element.type = Schema.Types.Mixed;
  //       }
  //       if (element.type == "String") {
  //         element.type = String;
  //       }
  //     }
  //   }

  // valida si el modelo a usar no se ha creado antes
  //   if (!modelList.includes(modelName)) {
  //     // se crea el nuevo esquema
  //     let modelSchema = new Schema(collectionSchema);
  //     // se crea el modelo y se asigna a la variable dinámica
  //     DynamicModel = mongoose.model(modelName, modelSchema, collectionName);
  //   } else {
  //     // si el modelo existe, se obtiene y se asigna a la variable dinámica
  //     DynamicModel = mongoose.model(modelName);
  //   }

  // retorno de los objetos
  return {
    collection: objCrud,
    // objFormDb,
    // DynamicModel,
    // projection: objFormDb.config.projection,
    // projectionLabels: objFormDb.config.projectionLabels,
  };
};

module.exports = { getObjectsAndModel };
