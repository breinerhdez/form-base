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
      required: [true, "Path name required."],
    },
    collection_name: {
      type: String,
      unique: true,
      required: [true, "Collection name required."],
    },
    title: {
      type: String,
      required: [true, "Title required."],
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
