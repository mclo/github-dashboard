let path = require("path");
let _ = require("lodash");

let nodeEnv = process.env.NODE_ENV;
let envConfig = nodeEnv ? require("./" + nodeEnv + ".js") : {};

let all = {
  root: path.normalize(__dirname + "/../.."),
  dotenv_root: path.normalize(__dirname + "/../../../.env"),
  port: process.env.PORT || 8000,
  env: nodeEnv
};

module.exports = _.merge(all, envConfig);
