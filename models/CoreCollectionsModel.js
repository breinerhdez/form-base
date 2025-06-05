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
      match: [
        /^[a-z0-9_\-]+$/,
        "La Ruta/Recurso solo puede contener letras minúsculas, números o guiones.",
      ],
    },
    collection_name: {
      type: String,
      unique: true,
      required: [true, "El Nombre de colección de datos es requerido."],
      match: [
        /^[a-z0-9_\-]+$/,
        "El Nombre de colección de datos solo puede contener letras minúsculas, números o guiones bajos.",
      ],
    },
    title: {
      type: String,
      required: [true, "El Título es requerido."],
      // match: [
      //   /^[a-zA-Z0-9]+$/,
      //   "El Título solo puede contener letras y números.",
      // ],
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
    userId: {
      type: String,
      default: null,
    },
    allowForAllUsers: {
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
