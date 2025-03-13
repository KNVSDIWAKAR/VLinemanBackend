import express from "express";
import {
  createTower,
  getAllTowers,
  getTowerById,
  updateTower,
  deleteTower,
  deleteAllTowers,
  getAssignedTowers,
} from "../controllers/TowerController.js";

const router = express.Router();

router.post("/create", createTower);
router.get("/assigned/:email", getAssignedTowers);
router.get("/", getAllTowers);
router.get("/:id", getTowerById);
router.put("/:id", updateTower);
router.delete("/:id", deleteTower);
router.delete("/", deleteAllTowers);

export default router;
