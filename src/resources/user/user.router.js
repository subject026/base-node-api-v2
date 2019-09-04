import { Router } from "express";

import { me } from "./user.controllers";

const router = Router();

router.get("/", me);

export default router;
