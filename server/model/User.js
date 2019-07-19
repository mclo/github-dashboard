"use strict";

let mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  id: String,
  username: String,
  image_url: String,
  access_token: String,
  email: String,
  firebase_token: String,
  subscriptions: [
    {
      repo_id: String,
      events: [String],
      repo_name: String,
      owner: String,
      url: String,
      hook_id: Number
    }
  ]
});

//TODO update all DB dependencies! new: repo_name, events, hook_id

let User = mongoose.model("User", userSchema);

module.exports = User;
