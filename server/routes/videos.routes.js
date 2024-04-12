import express from "express";
import upload from "../multerConfig.js";
import { getAllVideos, createVideo, getVideoByID } from "../controllers/videos.controller.js";

const router = express.Router();

router.get("/", getAllVideos);
router.post("/", upload.single("image"), createVideo);
router.get("/:id", getVideoByID);

export default router;
