import express from "express";
import { getStatus, updateStatus } from "../controllers/StatusController.js";

const router = express.Router();

// Get status of a specific Tower Task
router.get("/:id", getStatus);

// Update status of a specific Tower Task
router.put("/:id", updateStatus);

export default router;
