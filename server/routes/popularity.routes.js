import express from "express";

import { getAllPops, createPop, getPopByVideoID } from "../controllers/popularity.controller.js";

const router = express.Router();

router.route("/").get(getAllPops);
router.route("/").post(createPop);
router.route("/:id").get(getPopByVideoID);

export default router;
