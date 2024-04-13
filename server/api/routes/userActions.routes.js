import express from "express";
import {
  getAllUserActions,
  createUserAction,
  getUserActionByUserID,
} from "../controllers/userActions.controller.js";

const router = express.Router();

router.get("/", getAllUserActions);
router.post("/", createUserAction);
router.get("/:id", getUserActionByUserID);

export default router;
