"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = exports.app = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = require("body-parser");

var _cors = _interopRequireDefault(require("cors"));

var _morgan = _interopRequireDefault(require("morgan"));

var _config = _interopRequireDefault(require("./config"));

var _auth = require("./utils/auth");

var _user = _interopRequireDefault(require("./resources/user/user.router"));

var _project = _interopRequireDefault(require("./resources/project/project.router"));

var _db = require("./utils/db");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
exports.app = app;
app.use((0, _cors.default)());
app.use((0, _bodyParser.json)());
app.use((0, _bodyParser.urlencoded)({
  extended: true
}));
app.use((0, _morgan.default)("dev"));
app.use(async (req, res, next) => {
  // if (req.headers.authorization) {
  //   const token = req.headers.authorization.split("Bearer ")[1];
  //   console.log("\n\n\nTOKEN:::::::::::::::", token);
  //   const verified = await verifyToken(token);
  //   console.log("\n\n verified!!     \n\n", verified);
  //   req.user = { _id: verified.id };
  // }
  console.log("paamzzzz: ", req.params);
  next();
});
app.post("/signup", _auth.signup);
app.post("/signin", _auth.signin);
app.use("/api/user", _user.default);
app.use("/api/project", _project.default);

const start = async () => {
  try {
    (0, _db.connect)();
    app.listen(_config.default.port, () => {
      console.log(`REST API on http://localhost:${_config.default.port}/api`);
    });
  } catch (err) {
    console.error(err);
  }
};

exports.start = start;