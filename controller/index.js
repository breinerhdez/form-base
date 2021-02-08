const express = require("express");
const app = express();

app.use(require("./formPrueba")); // remover
app.use(require("./admin"));
app.use(require("./crud/crud"));
app.use(require("./crud/formConfig"));

module.exports = app;
