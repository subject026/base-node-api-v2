import jwt from "jsonwebtoken";

import { User } from "../resources/user/user.model";
import config from "../config";

export const newToken = user => {
  return jwt.sign({ id: user.id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp
  });
};

export const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });

export const signup = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: "Need email and password!" });
  }
  try {
    const doc = await User.create(req.body);
    res.status(200).send({ data: doc });
  } catch (err) {
    console.error(err);
    res.status(400).end();
  }
};

export const signin = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: "Need email and password!" });
  }
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(401).end();
  try {
    const match = await user.checkPassword(req.body.password);
    if (!match)
      return res.status(401).send({ message: "Passwords dont match..." });
    const token = newToken(user);
    res.status(200).json({ token });
  } catch (err) {
    res.status(400).end();
  }
};

export const protect = async (req, res, next) => {
  next();
};
