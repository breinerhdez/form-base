const mongoose = require("mongoose");

const {
  allowServiceSchema,
  formSchema,
  collectionConfig,
} = require("./schemes/collectionsSubSchemas");

let modelSchema = new mongoose.Schema(
  {
    path_name: {
      type: String,
      unique: true,
      required: [true, "La Ruta/Recurso es requerido."],
    },
    collection_name: {
      type: String,
      unique: true,
      required: [true, "El Nombre de colección de datos es requerido."],
    },
    title: {
      type: String,
      required: [true, "El Título es requerido."],
    },
    allow_services: {
      type: allowServiceSchema,
      required: [true, "Allow service required."],
      default: {},
    },
    form: {
      type: formSchema,
      default: {},
    },
    collectionConfig: {
      type: collectionConfig,
      default: {},
    },
    showAdmin: {
      type: Boolean,
      default: false,
    },
    // publicForm: {
    //   type: Boolean,
    //   default: false,
    // },
    // urlToAfterCreate: {
    //   type: String,
    //   default: "",
    // },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "CoreCollections",
  modelSchema,
  "core_collections"
);
