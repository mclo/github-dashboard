"use strict";

process.env.NODE_ENV = process.env.NODE_ENV || "development";
let config = require("./config/environment/index");

require("dotenv").config({ path: config.dotenv_root });
require("./libs/dbConfig").connectDB();
require("./firebase/firebase").initializeFirebase();

let express = require("express"),
  session = require("express-session"),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  cookieParser = require("cookie-parser");

let passportConfig = require("./login/Github/passport"),
  errorMiddleware = require("./middleware/error"),
  routes = require("./routes/index.js");

let port = process.env.PORT;
let app = express();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//TODO remove for production
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {},
    resave: false,
    proxy: true,
    saveUninitialized: false
  })
);

passportConfig.setup(config.passport_callback);
app.use(passportConfig.passport.initialize());
app.use(passportConfig.passport.session());

app.use("/", routes);
app.use(errorMiddleware);

app.listen(port, () => console.log("Server listening on port ", port));

module.exports = app;
