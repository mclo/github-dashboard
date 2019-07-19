"use strict";

let mongoose = require("mongoose");

module.exports = {
    connectDB: function () {
        let db = mongoose.connection;

        db.on("error", console.error.bind(console, "connection error:"));
        db.once("open", function () {
            console.log("Connected to MongoDB!");
        });

        mongoose.connect(process.env.MONGO_URL);
    }
};