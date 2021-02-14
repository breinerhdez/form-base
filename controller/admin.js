const express = require("express");
const app = express();

const { checkSession } = require("../middlewares/autenticacion");

const CoreCollectionModel = require("../models/admin/crud/CoreAdminOptionsModel");

app.get("/admin", checkSession, async (req, res) => {
  // consulta usando el objeto dinámico
  let listObjects = await CoreCollectionModel.find({});

  let data = {
    title: "Administración del sistema",
    listObjects,
  };
  res.render("admin/index", data);
});

module.exports = app;
