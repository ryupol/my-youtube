import express from "express";
import { uploadThumbnail } from "../../config/multerConfig.js";
import {
  getAllVideos,
  createVideo,
  getVideoByID,
  addViewByID,
} from "../controllers/videos.controller.js";

const router = express.Router();

router.get("/", getAllVideos);
router.post("/", uploadThumbnail.single("image"), createVideo);
router.get("/:id", getVideoByID);
router.post("/addview/:id", addViewByID);

export default router;
