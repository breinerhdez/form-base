const express = require("express");
const app = express();

// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const CoreCollectionModel = require("../../models/admin/crud/CoreCollectionsModel");
const CoreFormsModel = require("../../models/admin/crud/CoreFormsModel");
const CoreFielsetModel = require("../../models/admin/crud/CoreFielsetModel");
const Form = require("../../lib/form/Form");

/**
 * Formulario para configurar un formulario
 */
app.get("/admin/form-config/:collection_id", async (req, res) => {
  let collection_id = req.params.collection_id;
  let objFormDb = await CoreFormsModel.findOne({ collection_id: collection_id });
  let fieldsetsList = await CoreFielsetModel.find({ form_id: objFormDb._id });
  // console.log(fieldsetsList);

  // definición de campos del formulario
  let configForm = getFormConfig();

  let actionForm = `/admin/form-config/${collection_id}`;

  let objForm = new Form(actionForm, configForm.config, objFormDb); // action no es necesaria
  objForm.build(configForm);

  let data = {
    title: "Gestionar formulario",
    objForm,
    objFormDb,
    fieldsetsList,
    collection_id,
  };
  res.render("admin/crud/formConfig", data);
});

/**
 * Guardar la configuración de un formulario
 */
app.post("/admin/form-config/:collection_id", async (req, res) => {
  let collection_id = req.params.collection_id;
  let objFormDb = await CoreFormsModel.findOne({ collection_id: collection_id });

  objFormDb.action = req.body["action"];
  objFormDb.config.method = req.body["config.method"];
  objFormDb.config.btn_submit.show = req.body["config.btn_submit.show"] === "true" ? true : false;
  objFormDb.config.btn_submit.value = req.body["config.btn_submit.value"] ? req.body["config.btn_submit.value"] : "Enviar";

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
    let objFieldset = new CoreFielsetModel({
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
    let objFieldset = new CoreFielsetModel({
      form_id,
      legend,
    });
    let result = await objFieldset.save();
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
    let objFieldset = await CoreFielsetModel.findById(idFieldset);
    objFieldset.legend = legend;
    let result = await objFieldset.save();
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
    let result = await CoreFielsetModel.findByIdAndDelete(idFieldset);
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

app.get("/admin/form-config/getForm/:form_id", async (req, res) => {
  try {
    let form_id = req.params.form_id;
    let fieldsetsList = await CoreFielsetModel.find({ form_id: form_id });
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

// app.get("/admin/form-config/field/:fielset_id", (req, res) => {
//   res.json({ msg: "almacenar datos en la URL: /admin/form-config/field/:fielset_id", data: req.body });
// });

app.post("/admin/form-config/field/:fielset_id", (req, res) => {
  console.log(req.body, req.params.fielset_id);

  res.json({ ok: true, msg: "almacenar campos de un fieldset: /admin/form-config/field/:fielset_id", data: req.body });
});

let getFormConfig = () => {
  return {
    action: "/",
    config: {
      btn_submit: {
        show: true,
        value: "Guardar",
      },
    },

    fieldsets: [
      {
        config: { legend: "Datos del formulario" },
        fields: [
          [
            {
              classNameFullCon: "col-md-6",
              label: "Action",
              name: "action",
              required: true,
              type: "text",
            },
            {
              classNameFullCon: "col-md-6",
              label: "ID de la colección",
              name: "collection_id",
              required: true,
              type: "text",
            },
            {
              classNameFullCon: "col-md-6",
              label: "Method",
              name: "config.method",
              required: true,
              type: "text",
            },
          ],
        ],
      },
      {
        config: { legend: "Botón de envío" },
        fields: [
          [
            {
              classNameFullCon: "col-md-6",
              label: "Mostrar botón",
              name: "config.btn_submit.show",
              required: true,
              type: "text",
            },
            {
              classNameFullCon: "col-md-6",
              label: "Texto del botón",
              name: "config.btn_submit.value",
              required: true,
              type: "text",
            },
          ],
        ],
      },
    ],
  };
};

module.exports = app;
