const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let modelSchema = new Schema({
  collection_id: {
    type: String,
    required: [true, "La URI es obligatoria"],
  },
  action: {
    type: String,
    required: [true, "La URI es obligatoria"],
  },
  config: {
    type: Schema.Types.Mixed,
    unique: true,
    required: [true, "El nombre de la colección es obligatoria"],
  },
  fieldsets: {
    type: Array,
    required: [true, "El título principal es obligatorio"],
  },
});

module.exports = mongoose.model("CoreForms", modelSchema, 'core_forms');
