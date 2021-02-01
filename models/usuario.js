// let rolesValidos = {
//   values: ["ADMIN_ROLE", "USER_ROLE"],
//   message: "{VALUE} no es un rol válido",
// };

module.exports = {
  nombre: {
    name: "nombre",
    label: "Nombre completo",
    required: true,
    classNameFullCon: "col-md-6"
  },
  email: {
    type: "email",
    name: "email",
    label: "Correo electrónico",
    // classNameFullCon: "col-md -12"
  },
  password: {
    type: "password",
    name: "contrasena",
    label: "Contraseña",
    // classNameFullCon: "col-md-6"
  },
  photo: {
    type: "text",
    name: "foto",
    label: "Foto",
    // classNameFullCon: "col-md-6"
  },
};
