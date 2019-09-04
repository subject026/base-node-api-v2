"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = void 0;

require("dotenv").config();

const config = {
  secrets: {
    jwt: "wooooitsalovelything"
  },
  dbUrl: process.env.dbUrl
};
exports.config = config;