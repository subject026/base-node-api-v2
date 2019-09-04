"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = require("lodash");

const env = process.env.NODE_ENV || "development";
const baseConfig = {
  env,
  isDev: env === "development",
  port: 9000,
  secrets: {
    jwt: process.env.JWT_SECRET,
    jwtExp: "10h"
  }
};
let envConfig = {};

switch (env) {
  case "dev":
  case "development":
    envConfig = require("./dev").config;
    break;

  default: // nothing

}

var _default = (0, _lodash.merge)(baseConfig, envConfig);

exports.default = _default;