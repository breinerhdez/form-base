const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

/*let rolesValidos = {
  values: ["ADMIN_ROLE", "USER_ROLE"],
  message: "{VALUE} no es un rol válido",
};*/

let Schema = mongoose.Schema;

let coreUserSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio - Insecto!"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "El correo electrónico es obligatorio - Insecto!"],
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria - Insecto!"],
  },
  // img: {
  //   type: String,
  //   required: false,
  // },
  // role: {
  //   type: String,
  //   required: [true, "El rol es obligatorio"],
  //   default: "USER_ROLE",
  //   enum: rolesValidos,
  // },
  estado: {
    type: Boolean,
    default: true,
  },
  // google: {
  //   type: Boolean,
  //   default: false,
  // },
});

coreUserSchema.methods.toJSON = function () {
  let user = this;
  let objUser = user.toObject();
  delete objUser.password;
  return objUser;
};

coreUserSchema.plugin(uniqueValidator, { message: "{PATH} debe ser único" });

module.exports = mongoose.model("CoreUsers", coreUserSchema, "core_users");
