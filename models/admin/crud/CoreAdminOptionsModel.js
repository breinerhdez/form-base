const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let modelSchema = new Schema({
  url: {
    type: "String",
    required: [true, "La URL es obligatoria"],
  },
  name: {
    type: "String",
    required: [true, "El nombre es obligatorio"],
  },
  icon: {
    type: "String",
    required: [true, "El icono es obligatorio"],
  },
});

module.exports = mongoose.model("CoreAdminOptions", modelSchema, "core_admin_options");
