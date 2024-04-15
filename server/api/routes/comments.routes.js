import express from "express";
import {
  getAllComments,
  createComment,
  updateComment,
  getCommentByVideoID,
} from "../controllers/comments.controller.js";

const router = express.Router();

router.get("/", getAllComments);
router.post("/", createComment);
router.post("/update", updateComment);
router.get("/:id", getCommentByVideoID);

export default router;
