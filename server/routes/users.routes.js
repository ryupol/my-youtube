import express from "express";

import { getAllUsers, createUser, getSessionUser, signIn, signOut } from "../controllers/users.controller.js";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/", createUser);
router.post("/login", signIn);
router.post("/logout", signOut);
router.get("/session", getSessionUser);

export default router;
