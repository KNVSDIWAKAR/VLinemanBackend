import Tower from "../models/Tower.js";
import mongoose from "mongoose";
import User from "../models/User.js";

export const getAssignedTowers = async (req, res) => {
  try {
    const { email } = req.params;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const users = await User.find().sort({ _id: 1 });
    const towers = await Tower.find().sort({ _id: 1 });

    if (users.length === 0) {
      return res.status(400).json({ message: "No users found" });
    }

    if (towers.length === 0) {
      return res.status(400).json({ message: "No towers found" });
    }

    const usersCount = users.length;
    const towersPerUser = Math.floor(towers.length / usersCount);
    let assignedTowers = [];

    users.forEach((user, index) => {
      let startIndex = index * towersPerUser;
      let endIndex = startIndex + towersPerUser;

      let userTowers = towers.slice(startIndex, endIndex).map((tower) => ({
        ...tower.toObject(),
        ASSIGNED_TO: user.email,
      }));

      assignedTowers.push(...userTowers);
    });

    const userTowers = assignedTowers.filter(
      (tower) => tower.ASSIGNED_TO === email
    );

    res.json(userTowers);
  } catch (error) {
    console.error("Error fetching assigned towers:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

export const createTower = async (req, res) => {
  try {
    console.log("Received request body:", req.body);

    if (!Array.isArray(req.body)) {
      return res.status(400).json({ message: "Request body must be an array" });
    }

    const requiredFields = [
      "FAULTID",
      "YYMMDD",
      "FAULT",
      "TOWERNAME",
      "ARM",
      "CODE",
      "SCORE",
      "CRITICALITY",
      "SEVERITY",
    ];

    const towersToInsert = [];
    const validationErrors = new Map();

    req.body.forEach((tower, index) => {
      const missingFields = requiredFields.filter(
        (field) => tower[field] == null
      );

      if (missingFields.length > 0) {
        validationErrors.set(
          index + 1,
          `Missing fields: ${missingFields.join(", ")}`
        );
        return;
      }

      towersToInsert.push({
        FAULTID: tower.FAULTID ?? "",
        YYMMDD: tower.YYMMDD ?? "",
        FAULT: tower.FAULT ?? "",
        TOWERNAME: tower.TOWERNAME ?? "",
        IMAGE1: tower.IMAGE1 ?? "",
        IMAGE2: tower.IMAGE2 ?? "",
        IMAGE3: tower.IMAGE3 ?? "",
        ARM: tower.ARM ?? "",
        CODE: tower.CODE ?? "",
        DESCRIPTION: tower.DESCRIPTION ?? "",
        COMMENT: tower.COMMENT ?? "",
        SCORE: tower.SCORE
          ? mongoose.Types.Decimal128.fromString(tower.SCORE.toString())
          : mongoose.Types.Decimal128.fromString("0"),
        CRITICALITY: tower.CRITICALITY ?? "",
        SEVERITY: tower.SEVERITY ?? "",
      });
    });

    if (validationErrors.size > 0) {
      return res.status(400).json({
        message: "Validation errors",
        errors: Object.fromEntries(validationErrors),
      });
    }

    if (towersToInsert.length === 0) {
      return res.status(400).json({ message: "No valid towers to insert" });
    }
    const insertedTowers = await Tower.insertMany(towersToInsert, {
      ordered: false,
    });

    res.status(201).json({
      message: "Towers created successfully",
      insertedCount: insertedTowers.length,
      towers: insertedTowers,
    });
  } catch (error) {
    console.error("Error creating Towers:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

export const getAllTowers = async (req, res) => {
  try {
    const towers = await Tower.find();
    res.status(200).json(towers);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const getTowerById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Tower ID format" });
  }

  try {
    const tower = await Tower.findById(id);

    if (!tower) {
      return res.status(404).json({ message: "Tower record not found" });
    }

    res.status(200).json(tower);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const updateTower = async (req, res) => {
  try {
    const { SCORE } = req.body;

    if (SCORE) {
      req.body.SCORE = mongoose.Types.Decimal128.fromString(SCORE.toString());
    }

    const updatedTower = await Tower.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedTower)
      return res.status(404).json({ message: "Tower record not found" });

    res
      .status(200)
      .json({ message: "Tower record updated successfully", updatedTower });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const deleteTower = async (req, res) => {
  try {
    const deletedTower = await Tower.findByIdAndDelete(req.params.id);
    if (!deletedTower)
      return res.status(404).json({ message: "Tower record not found" });

    res.status(200).json({ message: "Tower record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
export const deleteAllTowers = async (req, res) => {
  try {
    await Tower.deleteMany({});
    res.status(200).json({ message: "All towers deleted successfully" });
  } catch (error) {
    console.error("Error deleting all towers:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};
