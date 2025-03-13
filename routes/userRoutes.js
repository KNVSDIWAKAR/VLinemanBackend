import express from "express";
import {
  registerUser,
  loginUser,
  getUserByEmail,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user/:email", getUserByEmail);

export default router;
