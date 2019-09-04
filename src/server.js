import express from "express";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import morgan from "morgan";

import config from "./config";
import { signup, signin, verifyToken } from "./utils/auth";
import userRouter from "./resources/user/user.router";
import projectRouter from "./resources/project/project.router";
import { connect } from "./utils/db";

export const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));

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

app.post("/signup", signup);
app.post("/signin", signin);

app.use("/api/user", userRouter);
app.use("/api/project", projectRouter);

export const start = async () => {
  try {
    connect();
    app.listen(config.port, () => {
      console.log(`REST API on http://localhost:${config.port}/api`);
    });
  } catch (err) {
    console.error(err);
  }
};
