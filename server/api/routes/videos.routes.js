import express from "express";
import { uploadThumbnail } from "../../config/multerConfig.js";
import {
  getAllVideos,
  searchVideos,
  createVideo,
  getVideoByID,
  addViewByID,
} from "../controllers/videos.controller.js";

const router = express.Router();

router.get("/", getAllVideos);
router.get("/search/:search_query", searchVideos);
router.post("/", uploadThumbnail.single("image"), createVideo);
router.get("/:id", getVideoByID);
router.post("/addview/:id", addViewByID);

export default router;
