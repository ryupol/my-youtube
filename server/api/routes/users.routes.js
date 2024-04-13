import express from "express";

import {
  getAllUsers,
  createUser,
  updateUser,
  signIn,
  signOut,
  getUserInSession,
} from "../controllers/users.controller.js";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/", createUser);
router.post("/update", updateUser);
router.post("/signin", signIn);
router.post("/signout", signOut);
router.get("/session", getUserInSession);

export default router;
