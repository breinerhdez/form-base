const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let modelSchema = new Schema({
  collection_id: {
    type: String, //TODO Schema.Types.ObjectId,
    required: [true, "La URI es obligatoria"],
    // ref: "core_collections",
  },
  action: {
    type: String,
    required: [true, "La URI es obligatoria"],
    default: '/admin-undefined',
  },
  config: {},
  fieldsets: {
    type: Array,
    required: [true, "El título principal es obligatorio"],
    default: [],
  },
});

module.exports = mongoose.model("CoreForms", modelSchema, "core_forms");
