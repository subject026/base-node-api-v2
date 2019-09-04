import { Router } from "express";

import controllers from "./project.controllers";

const router = Router();

router
  .route("/")
  .get(controllers.getMany)
  .post(controllers.createOne);

router
  .route("/:id")
  .get((req, res, next) => {
    console.log(req);
    next();
  })
  .put(controllers.updateOne);

export default router;
