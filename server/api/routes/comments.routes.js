import express from "express";
import {
  getAllComments,
  createComment,
  updateComment,
  getCommentByUserID,
} from "../controllers/comments.controller.js";

const router = express.Router();

router.get("/", getAllComments);
router.post("/", createComment);
router.post("/update", updateComment);
router.get("/:id", getCommentByUserID);

export default router;
