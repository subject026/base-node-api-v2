"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.protect = exports.signin = exports.signup = exports.verifyToken = exports.newToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _user = require("../resources/user/user.model");

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const newToken = user => {
  return _jsonwebtoken.default.sign({
    id: user.id
  }, _config.default.secrets.jwt, {
    expiresIn: _config.default.secrets.jwtExp
  });
};

exports.newToken = newToken;

const verifyToken = token => new Promise((resolve, reject) => {
  _jsonwebtoken.default.verify(token, _config.default.secrets.jwt, (err, payload) => {
    if (err) return reject(err);
    resolve(payload);
  });
});

exports.verifyToken = verifyToken;

const signup = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({
      message: "Need email and password!"
    });
  }

  try {
    const doc = await _user.User.create(req.body);
    res.status(200).send({
      data: doc
    });
  } catch (err) {
    console.error(err);
    res.status(400).end();
  }
};

exports.signup = signup;

const signin = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({
      message: "Need email and password!"
    });
  }

  const user = await _user.User.findOne({
    email: req.body.email
  });
  if (!user) return res.status(401).end();

  try {
    const match = await user.checkPassword(req.body.password);
    if (!match) return res.status(401).send({
      message: "Passwords dont match..."
    });
    const token = newToken(user);
    res.status(200).json({
      token
    });
  } catch (err) {
    res.status(400).end();
  }
};

exports.signin = signin;

const protect = async (req, res, next) => {
  next();
};

exports.protect = protect;