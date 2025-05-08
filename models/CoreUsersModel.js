const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

/*let rolesValidos = {
  values: ["ADMIN_ROLE", "USER_ROLE"],
  message: "{VALUE} no es un rol válido",
};*/

let Schema = mongoose.Schema;

let coreUserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "El Nombre completo es requerido."],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "El Correo electrónico es requerido."],
    },
    password: {
      type: String,
      required: [true, "El Contraseña es requerido."],
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
    status: {
      type: Boolean,
      default: true,
    },
    rols: {
      type: [String],
      required: [true, "Debe seleccionar al menos un rol."],
    },
    // google: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  {
    timestamps: true,
  }
);

coreUserSchema.methods.toJSON = function () {
  let user = this;
  let objUser = user.toObject();
  delete objUser.password;
  return objUser;
};

coreUserSchema.plugin(uniqueValidator, {
  message: "El Correo electrónico debe ser único.",
});

module.exports = mongoose.model("CoreUsers", coreUserSchema, "core_users");
