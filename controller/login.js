const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();

// const CoreCollectionModel = require("../models/admin/crud/CoreAdminOptionsModel");
const Usuario = require("../models/CoreUsers");

/**
 * Generar credenciales de acceso - JWT
 */
app.post("/login", async (req, res) => {
  try {
    let body = req.body;
    // consultar usuario en la base de datos
    let usuario = await Usuario.findOne({ email: body.email });

    // validar si existe el usuario
    if (!usuario) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "001: Usuario o contraseña incorrectos",
        },
      });
    }

    // validar si es la contraseña correcta
    if (!bcrypt.compareSync(body.password, usuario.password)) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "002: Usuario o contraseña incorrectos",
        },
      });
    }

    // generar el token
    let token = jwt.sign({ usuario }, process.env.JWT_SIGN_SECRET, {
      expiresIn: parseInt(process.env.JWT_EXPIRES_IN),
    });

    // entregar la respuesta
    res.json({
      ok: true,
      usuario,
      token,
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      err,
    });
  }
});

/**
 * Pantalla de inicio de sesión - Normal Session
 */
app.get("/", async (req, res) => {
  // validar si ya hay una sesión iniciada
  if (req.session.user) {
    return res.redirect("/admin");
  }

  let data = {
    title: "Ingresar al sistema",
  };
  res.render("home/login", data);
});

/**
 * Validar credenciales de acceso - Normal Session
 */
app.post("/login-process", async (req, res) => {
  try {
    let body = req.body;
    // consultar usuario en la base de datos
    let usuario = await Usuario.findOne({ email: body.username });

    // validar si existe el usuario
    if (!usuario) {
      console.log(`001: Usuario o contraseña incorrectos`);
      return res.redirect("/");
    }

    // validar si es la contraseña correcta
    if (!bcrypt.compareSync(body.password, usuario.password)) {
      console.log(`002: Usuario o contraseña incorrectos`);
      return res.redirect("/");
    }

    let sessData = {
      uid: usuario._id,
      email: usuario.email,
      nombre: usuario.nombre,
    };

    req.session.user = sessData;
    res.redirect("/admin");
  } catch (error) {
    console.log(`BH-ERROR: ${error}`);
    res.redirect("/");
  }
});

/**
 * Cerrar sesión
 */
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = app;
