import express from "express";
import {
  getAllSub,
  createSub,
  deleteSub,
  getAllSubBySession,
  getSubByID,
} from "../controllers/subscribe.controller.js";

const router = express.Router();

router.get("/", getAllSub);
router.post("/", createSub);
router.post("/delete", deleteSub);
router.get("/session", getAllSubBySession);
router.get("/:id", getSubByID);

export default router;
