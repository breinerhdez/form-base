const express = require("express");
const app = express();

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const CoreCollectionModel = require("../../models/admin/crud/CoreCollectionsModel");
const CoreFormsModel = require("../../models/admin/crud/CoreFormsModel");
// const Form = require("../../lib/form/Form");

app.get("/admin/forms/", (req, res) => {
  res.send("hola mundo");
});

module.exports = app;
