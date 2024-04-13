import express from "express";

import { getAllPops, addView, getPopByVideoID } from "../controllers/popularity.controller.js";

const router = express.Router();

router.route("/").get(getAllPops);
router.route("/add-view").post(addView);
router.route("/:id").get(getPopByVideoID);

export default router;
