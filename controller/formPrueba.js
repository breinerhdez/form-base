const express = require("express");
const app = express();

const Form = require("../lib/form/Form");
// const Fieldset = require("../lib/form/Fieldset");
// const Text = require("../lib/form/fields/Text");
// const Password = require("../lib/form/fields/Password");
// const Email = require("../lib/form/fields/Email");
// const File = require("../lib/form/fields/File");
// const { nombre, email, password, photo } = require("../models/usuario");
const dataconf = require("../models/dataconf");

app.get("/test/", (req, res) => {
  const objForm = new Form(dataconf.action);
  objForm.build(dataconf);

  let data = {
    title: "Formulario de prueba",
    objForm,
  };
  res.render("index", data);
});

app.post("/processForm", (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

module.exports = app;
