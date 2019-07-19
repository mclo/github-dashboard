"use strict";

let mongoose = require("mongoose");

let newsSchema = new mongoose.Schema(
  {
    user_id: String,
    url: String,
    repo_name: String,
    repo_id: String,
    event: String,
    date: {
      type: Date,
      default: Date.now()
    },
    seen: {
      type: Boolean,
      default: false
    }
  }
);

let News = mongoose.model('News', newsSchema);

module.exports = News;
