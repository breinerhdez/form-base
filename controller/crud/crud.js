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
  if (!objCrud) return false;

  // consultar el formulario
  let objFormDb = await CoreFormsModel.findOne({ collection_id: objCrud._id });
  if (!objFormDb) return false;

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
app.get("/admin/:pathName", async (req, res) => {
  try {
    // validar si existe el path
    let pathName = req.params.pathName;

    // obtener datos importantes
    let objectsAndModel = await getObjectsAndModel(pathName);
    if (!objectsAndModel) return res.redirect("/admin");

    // obtener los objetos de la respuesta
    let { objCrud, DynamicModel,projection } = objectsAndModel;

    // consulta usando el objeto dinámico
    let listObjects = await DynamicModel.find({},projection);

    // url botón crear
    const urlBtnCreate = `/admin/${pathName}/create`;
    const urlBase = `/admin/${pathName}/`;

    let data = {
      title: objCrud.title,
      urlBtnCreate,
      projection,
      listObjects,
      urlBase,
    };

    res.render("admin/crud/index", data);
  } catch (error) {
    console.log("Se ha presentado un error");
    console.log(`BH-ERROR: ${error}`);
    res.redirect("/admin");
  }
});

/**
 * Generar y mostrar el formulario de crear
 */
app.get("/admin/:pathName/create", async (req, res) => {
  try {
    // obtener parámetros
    const { pathName } = req.params;
    const actionForm = `/admin/${pathName}`;

    // obtener datos importantes
    let objectsAndModel = await getObjectsAndModel(pathName);
    if (!objectsAndModel) return res.redirect("/admin");

    // obtener los objetos de la respuesta
    let { objCrud, objFormDb } = objectsAndModel;

    // crear el objeto formulario
    // const objForm = new Form(objFormDb.action, objFormDb.config);
    const objForm = new Form(actionForm, objFormDb.config);
    objForm.build(objFormDb);

    let data = {
      title: objCrud.title,
      objForm,
    };

    res.render("admin/crud/create", data);
  } catch (error) {
    console.log("Se ha presentado un error - GET - create");
    console.log(`BH-ERROR: ${error}`);
    res.redirect("/admin");
  }
});

/**
 * Almacenar los datos de un nuevo registro
 */
app.post("/admin/:pathName", async (req, res) => {
  try {
    // obtener parámetros
    const { id, pathName } = req.params;

    // obtener datos importantes
    let objectsAndModel = await getObjectsAndModel(pathName);
    if (!objectsAndModel) return res.redirect("/admin");

    // obtener los objetos de la respuesta
    let { DynamicModel } = objectsAndModel;

    // generar nuevo objeto con los datos del body o formulario
    let newObj = new DynamicModel(req.body);
    // almacenar datos
    await newObj.save();
    res.redirect(`/admin/${pathName}`);
  } catch (error) {
    console.log("Se ha presentado un error - POST - create");
    console.log(`BH-ERROR: ${error}`);
    res.redirect("/admin");
  }
});

/**
 * Generar y mostrar el formulario de modificar
 */
app.get("/admin/:pathName/update/:id", async (req, res) => {
  try {
    // obtener parámetros
    const { pathName, id } = req.params;
    const actionForm = `/admin/${pathName}/${id}`;

    // obtener datos importantes
    let objectsAndModel = await getObjectsAndModel(pathName);
    if (!objectsAndModel) return res.redirect("/admin");

    // obtener los objetos de la respuesta
    let { objCrud, objFormDb, DynamicModel } = objectsAndModel;

    // validar si existe el registro
    let objDb = await DynamicModel.findById(id);
    if (!objDb) return res.redirect(`/admin/${pathName}`);

    // crear el objeto formulario
    const objForm = new Form(actionForm, objFormDb.config, objDb);
    objForm.config.btn_submit.value = "Modificar";
    // objForm.method = "put";
    objForm.build(objFormDb);

    let data = {
      title: objCrud.title,
      objForm,
    };

    res.render("admin/crud/update", data);
  } catch (error) {
    console.log("Se ha presentado un error - GET - create");
    console.log(`BH-ERROR: ${error}`);
    res.redirect("/admin");
  }
});

/**
 * Actualizar los datos de un registro existente
 */
app.post("/admin/:pathName/:id", async (req, res) => {
  try {
    // obtener parámetros
    const { id, pathName } = req.params;

    // obtener datos importantes
    let objectsAndModel = await getObjectsAndModel(pathName);
    if (!objectsAndModel) return res.redirect("/admin");

    // obtener los objetos de la respuesta
    let { DynamicModel } = objectsAndModel;

    // validar si existe el registro
    let objDb = await DynamicModel.findById(id);
    if (!objDb) return res.redirect(`/admin/${pathName}`);

    // actualizar el objeto con los nuevos valores
    let resObj = Object.assign(objDb, req.body);

    // almacenar datos
    await resObj.save();
    res.redirect(`/admin/${pathName}`);
  } catch (error) {
    console.log("Se ha presentado un error - POST - create");
    console.log(`BH-ERROR: ${error}`);
    res.redirect("/admin");
  }
});

/**
 * Eliminar un registro
 */
app.get("/admin/:pathName/delete/:id", async (req, res) => {
  try {
    // obtener parámetros
    const { pathName, id } = req.params;

    // obtener datos importantes
    let objectsAndModel = await getObjectsAndModel(pathName);
    if (!objectsAndModel) return res.redirect("/admin");

    // obtener los objetos de la respuesta
    let { DynamicModel } = objectsAndModel;

    // validar si existe el registro
    let objDb = await DynamicModel.findById(id);
    if (!objDb) return res.redirect(`/admin/${pathName}`);

    await DynamicModel.findByIdAndDelete(id);

    res.redirect(`/admin/${pathName}`);
  } catch (error) {
    console.log("Se ha presentado un error - GET - create");
    console.log(`BH-ERROR: ${error}`);
    res.redirect("/admin");
  }
});

module.exports = app;
