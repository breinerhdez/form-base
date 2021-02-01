require("./config/config");
const express = require("express");
var hbs = require("hbs");
// const mongoose = require("mongoose");

const app = express();

app.set("view engine", "hbs");

hbs.registerHelper("dsp", function (object) {
  return object.dsp();
});

app.use(express.static(__dirname + "/node_modules/bootstrap/dist"));
app.use(express.static(__dirname + "/public"));

const bodyParser = require("body-parser");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// configuración global de rutas / controladores
app.use(require("./controller/index"));

// mongoose.connect(
//   process.env.URLDB,
//   {
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   },
//   (err, res) => {
//     if (err) throw err;

//     console.log("Base de datos: ONLINE");
//   }
// );

app.listen(process.env.PORT, () => {
  console.log("App run on PORT: " + process.env.PORT);
});
