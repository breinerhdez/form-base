const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

/*let rolesValidos = {
  values: ["ADMIN_ROLE", "USER_ROLE"],
  message: "{VALUE} no es un rol válido",
};*/

let Schema = mongoose.Schema;

let coreUserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name required."],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email required."],
  },
  password: {
    type: String,
    required: [true, "Password required."],
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

coreUserSchema.plugin(uniqueValidator, { message: "{PATH} must be unique." });

module.exports = mongoose.model("CoreUsers", coreUserSchema, "core_users");
