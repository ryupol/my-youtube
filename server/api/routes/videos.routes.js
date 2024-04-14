import express from "express";
import { uploadThumbnail } from "../../config/multerConfig.js";
import { getAllVideos, createVideo, getVideoByID } from "../controllers/videos.controller.js";

const router = express.Router();

router.get("/", getAllVideos);
router.post("/", uploadThumbnail, createVideo);
router.get("/:id", getVideoByID);

export default router;
