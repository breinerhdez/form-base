const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let userSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

let detailSchema = new Schema({
  field: {
    type: String,
    required: true,
  },
  original: {
    type: String,
    default:""
  },
  updated: {
    type: String,
    required: true,
  },
});

let coreSchema = new Schema(
  {
    collection_name: {
      type: String,
      required: true,
    },
    user: {
      type: userSchema,
      required: true,
      default: {},
    },
    detail: {
      type: [detailSchema],
      required: true,
      default: [],
    },
    documentId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
    originAction: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CoreAuditLogs", coreSchema, "core_audit_logs");
