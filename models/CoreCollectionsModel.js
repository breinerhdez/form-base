const mongoose = require("mongoose");

// let Schema = mongoose.Schema;

let allowServiceSchema = new mongoose.Schema({
  list: {
    type: String,
    default: "N",
  },
  getById: {
    type: String,
    default: "N",
  },
  create: {
    type: String,
    default: "N",
  },
  update: {
    type: String,
    default: "N",
  },
  delete: {
    type: String,
    default: "N",
  },
});

let modelSchema = new mongoose.Schema({
  path_name: {
    type: String,
    required: [true, "Path name required"],
  },
  collection_name: {
    type: String,
    unique: true,
    required: [true, "Collection name required"],
  },
  title: {
    type: String,
    required: [true, "Title required"],
  },
  allow_services: {
    type: allowServiceSchema,
    required: [true, "Allow service required"],
    default: {
      list: "N",
      getById: "N",
      create: "N",
      update: "N",
      delete: "N",
    },
  },
});

module.exports = mongoose.model(
  "CoreCollections",
  modelSchema,
  "core_collections"
);
