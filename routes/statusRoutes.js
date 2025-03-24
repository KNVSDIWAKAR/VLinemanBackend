import express from "express";
import { getStatus, updateStatus } from "../controllers/StatusController";

const router = express.Router();

// Get status of a specific Tower Task
router.get("/:towerId", getStatus);

// Update status of a specific Tower Task
router.put("/:towerId", updateStatus);

export default router;
