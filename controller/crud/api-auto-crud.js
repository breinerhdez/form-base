const express = require("express");
const app = express();

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CoreCollectionModel = require("../../models/admin/crud/CoreCollectionsModel");
const CoreFormsModel = require("../../models/admin/crud/CoreFormsModel");

const Form = require("../../lib/form/Form");

/**
 * Validar que el path del crud existe
 * Obtener el formulario con el Schema
 * Generar modelo a partir del Schema
 */
let getObjectsAndModel = async (pathName) => {
  let objCrud = await CoreCollectionModel.findOne({ path_name: pathName });
  if (!objCrud) {
    console.log("ERROR-BH:", `No se evidencia un crud para el path "${pathName}".`);
    return false;
  }

  // consultar el formulario
  let objFormDb = await CoreFormsModel.findOne({ collection_id: objCrud._id });
  if (!objFormDb) {
    // console.log("BH-ERROR:", `No se evidencia un formulario para la gestión "${objCrud.title}".`);
    return false;
  }

  /**
   * definición de variables
   */
  // nombre de la colección
  let collectionName = objCrud.collection_name;
  // estructura del esquema
  let collectionSchema = objFormDb.config.schema;
  // nombre de la entidad o modelo
  let modelName = `${collectionName}_${objCrud._id}`;
  // lista de modelos existentes
  let modelList = mongoose.modelNames();
  // objeto de modelo dinámico
  let DynamicModel = null;

  // ajustes al Schema
  for (const prop in collectionSchema) {
    if (Object.hasOwnProperty.call(collectionSchema, prop)) {
      const element = collectionSchema[prop];
      if (element.type == "Schema.Types.Mixed") {
        element.type = Schema.Types.Mixed;
      }
      if (element.type == "String") {
        element.type = String;
      }
    }
  }

  // valida si el modelo a usar no se ha creado antes
  if (!modelList.includes(modelName)) {
    // se crea el nuevo esquema
    let modelSchema = new Schema(collectionSchema);
    // se crea el modelo y se asigna a la variable dinámica
    DynamicModel = mongoose.model(modelName, modelSchema, collectionName);
  } else {
    // si el modelo existe, se obtiene y se asigna a la variable dinámica
    DynamicModel = mongoose.model(modelName);
  }

  // retorno de los objetos
  return {
    objCrud,
    objFormDb,
    DynamicModel,
    projection: objFormDb.config.projection,
  };
};

/**
 * Listar los registros de la colección
 */
app.get("/api/crud/:pathName", async (req, res) => {
  try {
    // validar si existe el path
    let pathName = req.params.pathName;

    // obtener datos importantes
    let objectsAndModel = await getObjectsAndModel(pathName);
    if (!objectsAndModel) {
      return res.status(500).json({
        ok: false,
        error: {
          message: `Error interno - GET path ${pathName}`,
        },
      });
    }

    // obtener los objetos de la respuesta
    let { objCrud, DynamicModel, projection } = objectsAndModel;

    if (objCrud.allowServices.list != "Y") {
      return res.status(500).json({
        ok: false,
        error: {
          message: `Servicio no disponible`,
        },
      });
    }

    // consulta usando el objeto dinámico
    let listObjects = await DynamicModel.find({}, projection);

    res.json({
      ok: true,
      result: listObjects,
    });
  } catch (error) {
    console.log(`BH-ERROR: ${error}`);
    res.status(400).json({
      ok: false,
      error,
    });
  }
});

/**
 * Almacenar los datos de un nuevo registro
 */
app.post("/api/crud/:pathName", async (req, res) => {
  try {
    // obtener parámetros
    const { pathName } = req.params;

    // obtener datos importantes
    let objectsAndModel = await getObjectsAndModel(pathName);
    if (!objectsAndModel) {
      return res.status(500).json({
        ok: false,
        error: {
          message: `Error interno - POST path ${pathName}`,
        },
      });
    }

    // obtener los objetos de la respuesta
    let { objCrud, DynamicModel } = objectsAndModel;

    if (objCrud.allowServices.create != "Y") {
      return res.status(500).json({
        ok: false,
        error: {
          message: `Servicio no disponible`,
        },
      });
    }

    // generar nuevo objeto con los datos del body o formulario
    let newObj = new DynamicModel(req.body);
    // almacenar datos
    let objStored = await newObj.save();

    res.json({
      ok: true,
      result: objStored,
    });
  } catch (error) {
    console.log(`BH-ERROR: ${error}`);
    res.status(400).json({
      ok: false,
      error,
    });
  }
});

/**
 * Actualizar los datos de un registro existente
 */
app.put("/api/crud/:pathName/:id", async (req, res) => {
  try {
    // obtener parámetros
    const { id, pathName } = req.params;

    // obtener datos importantes
    let objectsAndModel = await getObjectsAndModel(pathName);
    if (!objectsAndModel) {
      return res.status(500).json({
        ok: false,
        error: {
          message: `Error interno - PUT path ${pathName}`,
        },
      });
    }

    // obtener los objetos de la respuesta
    let { objCrud, DynamicModel } = objectsAndModel;
    if (objCrud.allowServices.update != "Y") {
      return res.status(500).json({
        ok: false,
        error: {
          message: `Servicio no disponible`,
        },
      });
    }

    // validar si existe el registro
    let objDb = await DynamicModel.findById(id);
    if (!objDb) {
      res.status(400).json({
        ok: false,
        error: {
          message: `No se encontró el registro`,
        },
      });
    }

    // actualizar el objeto con los nuevos valores
    let resObj = Object.assign(objDb, req.body);

    // almacenar datos
    let result = await resObj.save();

    res.json({
      ok: true,
      result,
    });
  } catch (error) {
    console.log(`BH-ERROR: ${error}`);
    res.status(400).json({
      ok: false,
      error,
    });
  }
});

/**
 * Eliminar un registro
 */
app.delete("/api/crud/:pathName/:id", async (req, res) => {
  try {
    // obtener parámetros
    const { pathName, id } = req.params;

    // obtener datos importantes
    let objectsAndModel = await getObjectsAndModel(pathName);
    if (!objectsAndModel) {
      return res.status(500).json({
        ok: false,
        error: {
          message: `Error interno - DELETE path ${pathName}`,
        },
      });
    }

    // obtener los objetos de la respuesta
    let { objCrud, DynamicModel } = objectsAndModel;
    if (objCrud.allowServices.delete != "Y") {
      return res.status(500).json({
        ok: false,
        error: {
          message: `Servicio no disponible`,
        },
      });
    }

    // validar si existe el registro
    let objDb = await DynamicModel.findById(id);
    if (!objDb) {
      res.status(400).json({
        ok: false,
        error: {
          message: `No se encontró el registro`,
        },
      });
    }

    let result = await DynamicModel.findByIdAndDelete(id);

    res.json({
      ok: true,
      result,
    });
  } catch (error) {
    console.log(`BH-ERROR: ${error}`);
    res.status(400).json({
      ok: false,
      error,
    });
  }
});

/**
 * Obtener los datos de un objeto existente
 */
app.get("/api/crud/:pathName/:id", async (req, res) => {
  try {
    // obtener parámetros
    const { id, pathName } = req.params;

    // obtener datos importantes
    let objectsAndModel = await getObjectsAndModel(pathName);
    if (!objectsAndModel) {
      return res.status(500).json({
        ok: false,
        error: {
          message: `Error interno - PUT path ${pathName}`,
        },
      });
    }

    // obtener los objetos de la respuesta
    let { objCrud, DynamicModel } = objectsAndModel;
    if (objCrud.allowServices.getById != "Y") {
      return res.status(500).json({
        ok: false,
        error: {
          message: `Servicio no disponible`,
        },
      });
    }

    // validar si existe el registro
    let objDb = await DynamicModel.findById(id);
    if (!objDb) {
      res.status(400).json({
        ok: false,
        error: {
          message: `No se encontró el registro`,
        },
      });
    }

    res.json({
      ok: true,
      result: objDb,
    });
  } catch (error) {
    console.log(`BH-ERROR: ${error}`);
    res.status(400).json({
      ok: false,
      error,
    });
  }
});

module.exports = app;
