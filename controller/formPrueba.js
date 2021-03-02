const express = require("express");
const app = express();

// se obtiene representación de la clase Form
const Form = require("../lib/form/Form");
const dataconf = require("../models/dataconf");

app.get("/test/", (req, res) => {
  const objForm = new Form(dataconf.action, dataconf.config);
  objForm.build(dataconf);

  let data = {
    title: "Formulario de prueba - BH",
    objForm,
    flashMessages: res.locals.flash,
  };
  
  res.render("prueba/index", data);
});

app.post("/processForm", (req, res) => {
  console.log(req.body);
  res.json(req.body);
});


app.get("/test/config", (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  return res.json(dataconf)
})

module.exports = app;
