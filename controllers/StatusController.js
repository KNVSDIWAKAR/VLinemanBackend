import Status from "../models/Status.js";
import mongoose from "mongoose";

export const getStatus = async (req, res) => {
  try {
    const towerId = req.params.towerId || req.params.id;
    if (!towerId) {
      return res.status(400).json({ message: "Tower ID is required" });
    }

    const status = await Status.findOne({ TowerId: towerId });

    if (!status) {
      return res.status(404).json({ message: "Status record not found" });
    }

    res.status(200).json(status);
  } catch (error) {
    console.error("Error fetching status:", error.message, error.stack);
    res.status(500).json({ message: "Server Error", error });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const towerId = req.params.towerId || req.params.id;
    const { step } = req.body;

    console.log("Received towerId:", towerId);
    console.log("Received step:", step);

    if (!towerId || !step) {
      return res
        .status(400)
        .json({ message: "Tower ID and step are required" });
    }

    if (!mongoose.connection.readyState) {
      return res.status(500).json({ message: "Database not connected" });
    }

    const validSteps = [
      "preparedness",
      "duringMaintenance",
      "reportingMaintenance",
      "submittedTask",
    ];

    if (!validSteps.includes(step)) {
      return res.status(400).json({ message: "Invalid step" });
    }

    let status = await Status.findOne({ TowerId: towerId });

    if (!status) {
      console.log("No existing status found, creating a new record");
      status = new Status({ TowerId: towerId });
    }

    status[step] = status[step] || {}; // Preserve existing data if available
    status[step].status = true;
    status[step].date = new Date();

    await status.save();
    console.log(`Updated ${step} successfully for towerId: ${towerId}`);
    res.status(200).json({ message: `${step} updated successfully`, status });
  } catch (error) {
    console.error("Error updating status:", error.message, error.stack);
    res.status(500).json({ message: "Server Error", error });
  }
};
