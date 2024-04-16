import express from "express";
import {
  getAllComments,
  createComment,
  updateComment,
  deleteComment,
  getCommentByVideoID,
} from "../controllers/comments.controller.js";

const router = express.Router();

router.get("/", getAllComments);
router.post("/:id", createComment);
router.post("/update", updateComment);
router.post("/delete/:id", deleteComment);
router.get("/:id", getCommentByVideoID);

export default router;
