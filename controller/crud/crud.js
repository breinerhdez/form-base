const express = require("express");
const app = express();

const { checkSession } = require("../../middlewares/autenticacion");

const CoreCollectionModel = require("../../models/admin/crud/CoreCollectionsModel");
const CoreFormsModel = require("../../models/admin/crud/CoreFormsModel");

const Form = require("../../lib/form/Form");
const formConfig = require("../../models/form-config/form-crud");

/**
 * Almacenar formulario por defecto para el nuevo CRUD
 */
let storeDefaultForm = async (objCrud) => {
  try {
    let objForm = new CoreFormsModel({
      collection_id: objCrud._id,
      config: {
        projection: ["collection_id", "action"],
        method: "post",
        btn_submit: {
          show: true,
          value: "Enviar"
        }
        // schema: mongoose.model("CoreForms").schema.tree,
      },
    });
    return await objForm.save();
  } catch (error) {
    console.log("BH-ERROR:", `No se pudo guardar el formulario de una nueva gestión o CRUD`, error);
    return false;
  }
};

/**
 * Listar los registros de la colección
 */
app.get("/admin/crud", checkSession, async (req, res) => {
  try {
    // filtro de columnas a consultar
    let projection = ["title", "path_name", "collection_name"];

    // consulta usando el objeto dinámico
    let listObjects = await CoreCollectionModel.find({}, projection);

    // url botón crear
    const urlBtnCreate = `/admin/crud/create`;
    const urlBase = `/admin/crud/`;

    let data = {
      title: "Gestión de CRUDssss",
      urlBtnCreate,
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
app.get("/admin/crud/create", checkSession, async (req, res) => {
  try {
    // obtener parámetros
    const actionForm = `/admin/crud`;

    // crear el objeto formulario
    const objForm = new Form(actionForm, formConfig.config);
    objForm.build(formConfig);

    let data = {
      title: "Crear CRUD",
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
app.post("/admin/crud", checkSession, async (req, res) => {
  try {
    // generar nuevo objeto con los datos del body o formulario
    let newObj = new CoreCollectionModel(req.body);
    newObj.allowServices = {
      list: "N",
      getById: "N",
      create: "N",
      update: "N",
      delete: "N",
    };

    // almacenar datos
    let objStored = await newObj.save();
    console.log(objStored);

    // almacenar fomulario por defecto
    let resultNewForm = await storeDefaultForm(objStored);
    console.log("BH-INFO:", `Resultado de almacenar formulario para la gestión "${newObj.title}"`, resultNewForm);

    res.redirect(`/admin/crud`);
  } catch (error) {
    console.log("Se ha presentado un error - POST - create");
    console.log(`BH-ERROR: ${error}`);
    res.redirect("/admin");
  }
});

/**
 * Generar y mostrar el formulario de modificar
 */
app.get("/admin/crud/update/:id", checkSession, async (req, res) => {
  try {
    // obtener parámetros
    const { id } = req.params;
    const actionForm = `/admin/crud/${id}`;

    // validar si existe el registro
    let objDb = await CoreCollectionModel.findById(id);
    if (!objDb) return res.redirect(`/admin/crud`);

    // crear el objeto formulario
    const objForm = new Form(actionForm, formConfig.config, objDb);
    objForm.config.btn_submit.value = "Modificar";
    // objForm.method = "put";
    objForm.build(formConfig);

    let data = {
      title: "Modificar CRUD",
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
app.post("/admin/crud/:id", checkSession, async (req, res) => {
  try {
    // obtener parámetros
    const { id } = req.params;

    // validar si existe el registro
    let objDb = await CoreCollectionModel.findById(id);
    if (!objDb) return res.redirect(`/admin/crud`);

    // actualizar el objeto con los nuevos valores
    let resObj = Object.assign(objDb, req.body);

    // almacenar datos
    await resObj.save();
    res.redirect(`/admin/crud`);
  } catch (error) {
    console.log("Se ha presentado un error - POST - create");
    console.log(`BH-ERROR: ${error}`);
    res.redirect("/admin");
  }
});

/**
 * Eliminar un registro
 */
app.get("/admin/crud/delete/:id", checkSession, async (req, res) => {
  try {
    // obtener parámetros
    const { id } = req.params;

    // validar si existe el registro
    let objDb = await CoreCollectionModel.findById(id);
    if (!objDb) return res.redirect(`/admin/crud`);

    await CoreCollectionModel.findByIdAndDelete(id);

    res.redirect(`/admin/crud`);
  } catch (error) {
    console.log("Se ha presentado un error - GET - create");
    console.log(`BH-ERROR: ${error}`);
    res.redirect("/admin");
  }
});

/**
 * Formulario para configurar el API
 */
app.get("/admin/crud/conf-api/:id", checkSession, async (req, res) => {
  try {
    // obtener parámetros
    const { id } = req.params;

    // validar si existe el registro
    let objDb = await CoreCollectionModel.findById(id);
    if (!objDb) return res.redirect(`/admin/crud`);

    let data = {
      title: "Configurar REST API",
      objCrud: objDb,
    };

    res.render("admin/crud/api", data);
  } catch (error) {
    console.log("Se ha presentado un error - GET - create");
    console.log(`BH-ERROR: ${error}`);
    res.redirect("/admin");
  }
});

/**
 * Guardar configuración del API
 */
app.post("/admin/crud/conf-api/process", checkSession, async (req, res) => {
  try {
    // obtener parámetros
    const { id } = req.body;
    const allowServices = {
      list: (req.body.list == "Y") ? "Y" : "N",
      getById: (req.body.getById == "Y") ? "Y" : "N",
      create: (req.body.create == "Y") ? "Y" : "N",
      update: (req.body.update == "Y") ? "Y" : "N",
      delete: (req.body.delete == "Y") ? "Y" : "N",
    };

    // validar si existe el registro
    let objDb = await CoreCollectionModel.findById(id);
    if (!objDb) return res.redirect(`/admin/crud`);

    // actualizar el objeto con los nuevos valores
    objDb.allowServices = allowServices;

    // almacenar datos
    await objDb.save();
    res.redirect(`/admin/crud`);
  } catch (error) {
    console.log("Se ha presentado un error - POST - API");
    console.log(`BH-ERROR: ${error}`);
    res.redirect("/admin/crud");
  }
});

module.exports = app;
