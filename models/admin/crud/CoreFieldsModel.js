const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let modelSchema = new Schema({
  fieldset_id: {
    type: Schema.Types.ObjectId, //TODO Schema.Types.ObjectId,
    required: [true, "Identificador de fieldset requerido"],
    ref: "CoreFieldsets",
  },
  type_db: {
    type: String,
    required: [true, "Tipo de dato en base de datos"],
    default: "String",
  },
  type: {
    type: String,
    required: [true, "Tipo de dato en HTML"],
    default: "text",
  },
  name: {
    type: String,
    required: [true, "Nombre del atributo"],
    default: "NO TIENE ASIGNADO",
  },
  label: {
    type: String,
    required: [true, "Label del campo"],
    default: "NO TIENE ASIGNADO",
  },
  required: {
    type: Boolean,
    required: [true, "Atributo 'required' es requerido"],
    default: true,
  },
  classNameFullCon: {
    type: String,
    default: "",
  },
  projection: {
    type: Boolean,
    required: [true, "Atributo 'projection' es requerido"],
    default: false,
  },
  // type: {
  //   type: Array,
  //   default: [],
  // },
});

module.exports = mongoose.model("CoreFields", modelSchema, "core_fields");
