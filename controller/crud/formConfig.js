const express = require("express");
const app = express();

const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const CoreCollectionModel = require("../../models/admin/crud/CoreCollectionsModel");
const CoreFormsModel = require("../../models/admin/crud/CoreFormsModel");
const CoreFieldsetModel = require("../../models/admin/crud/CoreFieldsetModel");
const CoreFieldsModel = require("../../models/admin/crud/CoreFieldsModel");
const CoreCollectionsModel = require("../../models/admin/crud/CoreCollectionsModel");

const breadcrumbOptions = {
  createCrud: {
    href: "/admin/crud",
    text: "Gestión de CRUDs",
  },
};

/**
 * Formulario para configurar un formulario
 */
app.get("/admin/form-config/:collection_id", async (req, res) => {
  let collection_id = req.params.collection_id;
  let objFormDb = await CoreFormsModel.findOne({ collection_id: collection_id });
  let fieldsetsList = await CoreFieldsetModel.find({ form_id: objFormDb._id });

  // validar si existe el registro
  let objCollection = await CoreCollectionsModel.findById(collection_id);
  if (!objCollection) return res.redirect(`/admin/crud`);

  let data = {
    title: `Gestionar formulario - ${objCollection.title}`,
    objFormDb,
    fieldsetsList,
    collection_id,
    optsBreadcrumb: [breadcrumbOptions.createCrud],
  };
  console.log(fieldsetsList);
  res.render("admin/crud/formConfig", data);
});

/**
 * Guardar la configuración de un formulario
 */
app.post("/admin/form-config/:collection_id", async (req, res) => {
  let collection_id = req.params.collection_id;
  let objFormDb = await CoreFormsModel.findOne({ collection_id: collection_id });

  // Atributos a actualizar
  objFormDb.action = req.body.action;
  objFormDb.config.method = req.body.config.method;
  objFormDb.config.btn_submit = req.body.config.btn_submit;
  objFormDb.config.btn_submit.show = req.body.config.btn_submit.show ? true : false;

  // indicar qué estructuras internas se deben modificar
  objFormDb.markModified("config");
  objFormDb.markModified("config.btn_submit");
  await objFormDb.save();

  res.redirect(`/admin/form-config/${collection_id}`);
});

app.post("/admin/form-config/fieldset/:form_id", async (req, res) => {
  let form_id = req.params.form_id;
  let { legend, collection_id } = req.body;
  try {
    let objFieldset = new CoreFieldsetModel({
      form_id,
      legend,
    });
    await objFieldset.save();
    res.redirect("/admin/form-config/" + collection_id);
    // res.json({ msg: "almacenar datos en la URL: /admin/form-config/fieldset/:form_id", data: req.body });
  } catch (error) {
    console.log("Se ha presentado un error - POST - Add Fieldset");
    console.log(`BH-ERROR: ${error}`);
    res.redirect("/admin/form-config/" + collection_id);
  }
});

app.post("/admin/form-config/v2/fieldset/:form_id", async (req, res) => {
  let form_id = req.params.form_id;
  let { legend } = req.body;
  try {
    let objFieldset = new CoreFieldsetModel({
      form_id,
      legend,
    });
    let result = await objFieldset.save();

    buildStructure(result.form_id);

    res.json({
      ok: true,
      result,
    });
  } catch (error) {
    console.log("Se ha presentado un error - POST - Add Fieldset");
    console.log(`BH-ERROR: ${error}`);
    res.json({
      ok: false,
      error,
    });
  }
});

app.post("/admin/form-config/v2/update/fieldset", async (req, res) => {
  let { legend, idFieldset } = req.body;
  try {
    let objFieldset = await CoreFieldsetModel.findById(idFieldset);
    objFieldset.legend = legend;
    let result = await objFieldset.save();

    buildStructure(result.form_id);

    res.json({
      ok: true,
      result,
    });
  } catch (error) {
    console.log("Se ha presentado un error - POST - Update Fieldset");
    console.log(`BH-ERROR: ${error}`);
    res.json({
      ok: false,
      error,
    });
  }
});

app.post("/admin/form-config/v2/delete/fieldset", async (req, res) => {
  let { idFieldset } = req.body;
  try {
    let result = await CoreFieldsetModel.findByIdAndDelete(idFieldset);

    buildStructure(result.form_id);

    res.json({
      ok: true,
      result,
    });
  } catch (error) {
    console.log("Se ha presentado un error - POST - Delete Fieldset");
    console.log(`BH-ERROR: ${error}`);
    res.json({
      ok: false,
      error,
    });
  }
});

app.get("/admin/form-config/get-fieldsets/:form_id", async (req, res) => {
  try {
    let form_id = req.params.form_id;
    let fieldsetsList = await CoreFieldsetModel.find({ form_id: form_id });
    res.json({
      ok: true,
      result: fieldsetsList,
    });
  } catch (error) {
    res.json({
      ok: false,
      error,
    });
  }
});

app.get("/admin/form-config/get-fieldset/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let fieldset = await CoreFieldsetModel.findById(id);
    res.json({
      ok: true,
      result: fieldset,
    });
  } catch (error) {
    console.log(error);
    res.json({
      ok: false,
      error,
    });
  }
});

/*************************************************
 * Fields management
 ************************************************/

app.get("/admin/form-config/get-fields/:fieldset_id", async (req, res) => {
  try {
    let fieldset_id = req.params.fieldset_id;
    let fieldsList = await CoreFieldsModel.find({ fieldset_id: fieldset_id });
    res.json({
      ok: true,
      result: fieldsList,
    });
  } catch (error) {
    console.log(error);
    res.json({
      ok: false,
      error,
    });
  }
});

app.get("/admin/form-config/fields/:fieldset_id", async (req, res) => {
  const fieldset_id = req.params.fieldset_id;
  const fieldset = await CoreFieldsetModel.findById(fieldset_id);

  let data = {
    title: "Gestionar campos",
    fieldset,
  };

  res.render("admin/crud/formFields", data);
});

app.post("/admin/form-config/fields/create", async (req, res) => {
  try {
    let data = req.body;
    delete data._id;

    let objFieldset = await CoreFieldsetModel.findById(req.body.fieldset_id);
    let objField = new CoreFieldsModel(data);
    let result = await objField.save();

    buildStructure(objFieldset.form_id);

    res.json({
      ok: true,
      result,
    });
  } catch (error) {
    console.log("Se ha presentado un error - POST - Add Field");
    console.log(`BH-ERROR: ${error}`);
    res.json({
      ok: false,
      error,
    });
  }
});

app.post("/admin/form-config/fields/update", async (req, res) => {
  try {
    const { type_db, type, name, label, required, classNameFullCon, _id, fieldset_id, projection } = req.body;
    let objFieldset = await CoreFieldsetModel.findById(fieldset_id);
    let objField = await CoreFieldsModel.findById(_id);

    objField.type_db = type_db;
    objField.type = type;
    objField.name = name;
    objField.label = label;
    objField.required = required;
    objField.projection = projection;
    objField.classNameFullCon = classNameFullCon;
    let result = await objField.save();

    buildStructure(objFieldset.form_id);

    res.json({
      ok: true,
      result,
    });
  } catch (error) {
    console.log("Se ha presentado un error - POST - Update Field");
    console.log(`BH-ERROR: ${error}`);
    res.json({
      ok: false,
      error,
    });
  }
});

app.post("/admin/form-config/fields/delete", async (req, res) => {
  let { _id: idField } = req.body;
  try {
    let result = await CoreFieldsModel.findByIdAndDelete(idField).populate("fieldset_id");

    buildStructure(result.fieldset_id.form_id);

    res.json({
      ok: true,
      result,
    });
  } catch (error) {
    console.log("Se ha presentado un error - POST - Delete Field");
    console.log(`BH-ERROR: ${error}`);
    res.json({
      ok: false,
      error,
    });
  }
});

async function buildStructure(form_id) {
  // get form information
  let objForm = await CoreFormsModel.findById(form_id).populate("collection_id");
  // get fieldsets
  let listFieldsets = await CoreFieldsetModel.find({ form_id });
  // create fieldset structure to form
  let structure = [];
  let all_fields = [];

  for (let index = 0; index < listFieldsets.length; index++) {
    let fieldset = listFieldsets[index];

    // get fields
    let fieldList = await CoreFieldsModel.find({ fieldset_id: fieldset._id });
    all_fields = [...all_fields, fieldList];

    let fieldsetStructure = {
      config: {
        legend: fieldset.legend,
      },
      fields: [fieldList],
    };
    // asignar la sub-estructura del fieldset a la estructura principal
    structure.push(fieldsetStructure);
  }
  // set structure to form
  objForm.fieldsets = structure;

  let projection = [];
  let projectionLabels = [];
  let mySchema = {};
  all_fields.forEach((rowFields) => {
    rowFields.forEach((field) => {
      let tmp = {};
      tmp["type"] = field.type_db;
      if (field.required) {
        tmp["required"] = [true, `the field ${field.name} is required`];
      }
      mySchema[field.name] = tmp;

      if (field.projection) {
        projection = [...projection, field.name];
        projectionLabels = [...projectionLabels, field.label];
      }
    });
  });

  // set projection and labels for projection
  objForm.config.projection = projection;
  objForm.config.projectionLabels = projectionLabels;
  // set schema to form object
  objForm.config.schema = mySchema;
  // allow changes for config.schema sub-object
  objForm.markModified("config");
  // allow changes for fieldset sub-object
  objForm.markModified("fieldsets");
  // save schema and fieldset structure
  await objForm.save();

  // refresh model schema - remove it
  let modelDynamic = `${objForm.collection_id.collection_name}_${objForm.collection_id._id}`;
  if (mongoose.modelNames().includes(modelDynamic)) {
    mongoose.deleteModel(`${objForm.collection_id.collection_name}_${objForm.collection_id._id}`);
  }
}

module.exports = app;
