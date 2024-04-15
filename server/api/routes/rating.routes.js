import express from "express";
import {
  getAllRating,
  updateLikeByID,
  updateDislikeByID,
  getRatingByVideoID,
} from "../controllers/rating.controller.js";

const router = express.Router();

router.get("/", getAllRating);
router.post("/like/:id", updateLikeByID);
router.post("/dislike/:id", updateDislikeByID);
router.get("/:id", getRatingByVideoID);

export default router;
