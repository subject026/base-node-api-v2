import { merge } from "lodash";
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
  default:
  // nothing
}

export default merge(baseConfig, envConfig);
