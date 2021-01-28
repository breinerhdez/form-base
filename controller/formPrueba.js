const express = require("express");
const app = express();

const Text = require("../lib/form/fields/Text");
const usuarioConf = require("../models/usuario")

app.get("/test/", (req, res) => {

  let inputConfig = {
    // id: "nomEmpleado",
    name: "nombre",
    required: false,
    className: 'btn btn-default',
    // label:'Nombre'
  }


  const nameInput = new Text(inputConfig);
  console.log(nameInput)
  console.log(nameInput.getInput())
  console.log(nameInput.getLabel())

  let data = {
    title: "Formulario de prueba",
  };
  res.render("index", data);
});

module.exports = app;
