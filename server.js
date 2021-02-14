require("./config/config");
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const app = express();

// configuración del motor de plantillas
app.set("views", "./views");
app.set("view engine", "pug");

// directorios públicos
app.use(express.static(__dirname + "/node_modules/bootstrap/dist"));
app.use(express.static(__dirname + "/node_modules/font-awesome"));
app.use(express.static(__dirname + "/node_modules/jquery/dist"));
app.use(express.static(__dirname + "/public"));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: parseInt(process.env.SESSION_TIME) },
  })
);

const bodyParser = require("body-parser");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// configuración global de rutas / controladores
app.use(require("./controller/index"));

// conexión a la base de datos
mongoose.connect(
  process.env.URLDB,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, res) => {
    if (err) throw err;
    console.log("Base de datos: ONLINE");
  }
);

app.listen(process.env.PORT, () => {
  console.log("App run on PORT: " + process.env.PORT);
});
