import express from "express";
import { uploadProfile } from "../../config/multerConfig.js";
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

router.post("/", getAllUsers);
router.post("/create", createUser);
router.post("/update", uploadProfile.single("image"), updateUser);
router.post("/signin", signIn);
router.post("/signout", signOut);
router.get("/session", getUserSession);
router.post("/:username", getUserByUsername);

export default router;
