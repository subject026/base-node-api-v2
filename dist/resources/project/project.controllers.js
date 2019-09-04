"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _project = require("./project.model");

var _crud = require("../../utils/crud");

var _default = (0, _crud.crudControllers)(_project.Project);

exports.default = _default;