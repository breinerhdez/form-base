const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let modelSchema = new Schema({
  form_id: {
    type: Schema.Types.ObjectId, //TODO Schema.Types.ObjectId,
    required: [true, "Identificador de formulario requerido"],
    ref: "CoreForms",
  },
  legend: {
    type: String,
    required: [true, "Legend requerido"],
    default: "Default Legend",
  },
  fields: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("CoreFieldsets", modelSchema, "core_fieldsets");
