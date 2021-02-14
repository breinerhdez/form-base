const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let modelSchema = new Schema({
  path_name: {
    type: String,
    required: [true, "La URI es obligatoria"],
  },
  collection_name: {
    type: String,
    unique: true,
    required: [true, "El nombre de la colección es obligatoria"],
  },
  title: {
    type: String,
    required: [true, "El título principal es obligatorio"],
  },
  allowServices: {
    type: Schema.Types.Mixed,
    required: [true, "Configuración de servicios es requerido"],
    default: {}
  },
});

module.exports = mongoose.model("CoreCollection", modelSchema, 'core_collections');
