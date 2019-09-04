"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _project = _interopRequireDefault(require("./project.controllers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)();
router.route("/").get(_project.default.getMany).post(_project.default.createOne);
router.route("/:id").get((req, res, next) => {
  console.log(req);
  next();
}).put(_project.default.updateOne);
var _default = router;
exports.default = _default;