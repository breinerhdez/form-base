const express = require("express");
const app = express();

// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const CoreCollectionModel = require("../../models/admin/crud/CoreCollectionsModel");
const CoreFormsModel = require("../../models/admin/crud/CoreFormsModel");
const Form = require("../../lib/form/Form");

/**
 * Formulario para configurar un formulario
 */
app.get("/admin/form-config/:collection_id", async (req, res) => {
  let collection_id = req.params.collection_id;
  let objFormDb = await CoreFormsModel.findOne({ collection_id: collection_id });

  // definición de campos del formulario
  let configForm = getFormConfig();
  console.log(configForm);

  let objForm = new Form(configForm.action, configForm.config, objFormDb); // action no es necesaria
  objForm.build(configForm);
  // let fields = [];
  // fields.push(objForm.getField(cnfAction).setValue("Prueba"));

  // console.log(fields);
  let data = {
    title: "Gestionar formulario",
    objForm,
  };
  res.render("admin/crud/formConfig", data);

  // res.json(objFormDb);
});

/**
 * Guardar la configuración de un formulario
 */
app.post("/admin/form-config/:collection_id", async (req, res) => {
  let response = {
    message: "Almacenar los datos",
  };
  res.json(response);
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
              label: "URL",
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
          ],
        ],
      },
    ],
  };
};

module.exports = app;
