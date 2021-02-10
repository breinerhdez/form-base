const express = require("express");
const app = express();

app.use(require("./crud/formConfig"));
app.use(require("./formPrueba")); // remover
app.use(require("./admin"));
app.use(require("./crud/auto-crud"));
app.use(require("./crud/crud"));

module.exports = app;
