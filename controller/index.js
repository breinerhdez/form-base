const express = require("express");
const app = express();

app.use(require("./formPrueba"));
app.use(require("./admin"));
app.use(require("./crud/crud"));

module.exports = app;
