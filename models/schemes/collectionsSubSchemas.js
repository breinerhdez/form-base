const mongoose = require("mongoose");

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

let collectionConfig = new mongoose.Schema({
  projection: {
    type: String,
    default: "name_field1 name_field2",
  },
  labels: {
    type: Array,
    default: ["Label field 1", "Label field 2"],
  },
});

let optionsSchema = new mongoose.Schema({
  type: {
    type: String,
    default: "CUSTOM",
  },
  values: {
    type: String,
    default: "OPTION 1,OPTION 2,OPTION 3",
  },
  collection_name: {
    type: String,
    default: "",
  },
});

let rulesSchema = new mongoose.Schema({
  required: {
    type: Boolean,
    default: false,
  },
});

let othersSchema = new mongoose.Schema({
  rules: {
    type: rulesSchema,
    default: {},
  },
  options: {
    type: optionsSchema,
    default: {},
  },
});

let fieldSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "name_field",
  },
  type: {
    type: String,
    default: "Text",
  },
  label: {
    type: String,
    default: "Label field",
  },
  cols: {
    type: String,
    default: "col-md-12",
  },
  default_value: {
    type: String,
    default: "Default value",
  },
  projection: {
    type: Boolean,
    default: true,
  },
  others: {
    type: othersSchema,
    default: {},
  },
});

let formSchema = new mongoose.Schema({
  fields: {
    type: [fieldSchema],
    default: [{}],
  },
});

module.exports = {
  allowServiceSchema,
  formSchema,
  collectionConfig,
};
