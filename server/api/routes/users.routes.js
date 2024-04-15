import express from "express";

import {
  getAllUsers,
  createUser,
  updateUser,
  signIn,
  signOut,
  getUserSession,
  getUserByUsername,
} from "../controllers/users.controller.js";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/", createUser);
router.post("/update", updateUser);
router.post("/signin", signIn);
router.post("/signout", signOut);
router.get("/session", getUserSession);
router.get("/:username", getUserByUsername);

export default router;
