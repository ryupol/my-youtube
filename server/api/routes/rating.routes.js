import express from "express";
import {
  getAllRating,
  updateLikeByID,
  updateDislikeByID,
  getRatingByVideoID,
  getUserLikeVideos,
} from "../controllers/rating.controller.js";

const router = express.Router();

router.get("/", getAllRating);
router.post("/like/:id", updateLikeByID);
router.post("/dislike/:id", updateDislikeByID);
router.get("/:id", getRatingByVideoID);
router.get("/user/like", getUserLikeVideos);

export default router;
