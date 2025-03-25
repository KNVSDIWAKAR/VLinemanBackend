import Status from "../models/Status.js"; // Ensure correct model import

export const updateStatus = async (req, res) => {
  try {
    const towerId = req.params.id;
    const { step } = req.body;

    if (!towerId) {
      return res.status(400).json({ message: "Tower ID is required" });
    }

    let status = await Status.findOne({ TowerId: towerId });

    if (!status) {
      status = new Status({ TowerId: towerId });
      await status.save();
    }

    // Update the relevant step
    if (step && status[step] !== undefined) {
      status[step].status = true;
      status[step].date = new Date();
    } else {
      return res.status(400).json({ message: "Invalid step provided" });
    }

    await status.save();
    res.status(200).json({ message: "Status updated successfully", status });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

export const getStatus = async (req, res) => {
  try {
    const towerId = req.params.id;
    if (!towerId) {
      return res.status(400).json({ message: "Tower ID is required" });
    }

    let status = await Status.findOne({ towerId });

    if (!status) {
      console.log("No status found, creating a new one...");

      // Creating a new status entry
      status = new Status({
        towerId,
        step: "not started", // Default step
      });

      await status.save();
      console.log("New status created:", status);
    }

    res.status(200).json(status);
  } catch (error) {
    console.error(
      "Error fetching/updating status:",
      error.message,
      error.stack
    );
    res.status(500).json({ message: "Server Error", error });
  }
};

export const updateStatus2 = async (req, res) => {
  try {
    const towerId = req.params.id;
    const { step } = req.body;

    if (!towerId) {
      return res.status(400).json({ message: "Tower ID is required" });
    }

    let status = await Status.findOne({ TowerId: towerId });

    if (!status) {
      status = new Status({ TowerId: towerId });
      await status.save();
    }

    // Update the relevant step
    if (step && status[step] !== undefined) {
      status[step].status = true;
      status[step].date = new Date();
    } else {
      return res.status(400).json({ message: "Invalid step provided" });
    }

    await status.save();
    res.status(200).json({ message: "Status updated successfully", status });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

export const getStatus2 = async (req, res) => {
  try {
    const towerId = req.params.id;
    if (!towerId) {
      return res.status(400).json({ message: "Tower ID is required" });
    }

    let status = await Status.findOne({ towerId });

    if (!status) {
      console.log("No status found, creating a new one...");

      // Creating a new status entry
      status = new Status({
        towerId,
        step: "not started", // Default step
      });

      await status.save();
      console.log("New status created:", status);
    }

    res.status(200).json(status);
  } catch (error) {
    console.error(
      "Error fetching/updating status:",
      error.message,
      error.stack
    );
    res.status(500).json({ message: "Server Error", error });
  }
};

export const updateStatus3 = async (req, res) => {
  try {
    const towerId = req.params.id;
    const { step } = req.body;

    if (!towerId) {
      return res.status(400).json({ message: "Tower ID is required" });
    }

    let status = await Status.findOne({ TowerId: towerId });

    if (!status) {
      status = new Status({ TowerId: towerId });
      await status.save();
    }

    // Update the relevant step
    if (step && status[step] !== undefined) {
      status[step].status = true;
      status[step].date = new Date();
    } else {
      return res.status(400).json({ message: "Invalid step provided" });
    }

    await status.save();
    res.status(200).json({ message: "Status updated successfully", status });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

export const getStatus3 = async (req, res) => {
  try {
    const towerId = req.params.id;
    if (!towerId) {
      return res.status(400).json({ message: "Tower ID is required" });
    }

    let status = await Status.findOne({ towerId });

    if (!status) {
      console.log("No status found, creating a new one...");

      // Creating a new status entry
      status = new Status({
        towerId,
        step: "not started", // Default step
      });

      await status.save();
      console.log("New status created:", status);
    }

    res.status(200).json(status);
  } catch (error) {
    console.error(
      "Error fetching/updating status:",
      error.message,
      error.stack
    );
    res.status(500).json({ message: "Server Error", error });
  }
};

export const updateStatus4 = async (req, res) => {
  try {
    const towerId = req.params.id;
    const { step } = req.body;

    if (!towerId) {
      return res.status(400).json({ message: "Tower ID is required" });
    }

    let status = await Status.findOne({ TowerId: towerId });

    if (!status) {
      status = new Status({ TowerId: towerId });
      await status.save();
    }

    // Update the relevant step
    if (step && status[step] !== undefined) {
      status[step].status = true;
      status[step].date = new Date();
    } else {
      return res.status(400).json({ message: "Invalid step provided" });
    }

    await status.save();
    res.status(200).json({ message: "Status updated successfully", status });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

export const getStatus4 = async (req, res) => {
  try {
    const towerId = req.params.id;
    if (!towerId) {
      return res.status(400).json({ message: "Tower ID is required" });
    }

    let status = await Status.findOne({ towerId });

    if (!status) {
      console.log("No status found, creating a new one...");

      // Creating a new status entry
      status = new Status({
        towerId,
        step: "not started", // Default step
      });

      await status.save();
      console.log("New status created:", status);
    }

    res.status(200).json(status);
  } catch (error) {
    console.error(
      "Error fetching/updating status:",
      error.message,
      error.stack
    );
    res.status(500).json({ message: "Server Error", error });
  }
};
