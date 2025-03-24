import mongoose from "mongoose";

const StatusSchema = new mongoose.Schema({
  TowerId: { type: String, required: true, unique: true },

  // Preparedness Step
  preparedness: {
    status: { type: Boolean, default: false },
    date: { type: Date },
  },

  // During Maintenance Step
  duringMaintenance: {
    status: { type: Boolean, default: false },
    date: { type: Date },
  },

  // Reporting Maintenance Step
  reportingMaintenance: {
    status: { type: Boolean, default: false },
    date: { type: Date },
  },

  // Submitted Task Step
  submittedTask: {
    status: { type: Boolean, default: false },
    date: { type: Date },
  },
});

export default mongoose.model("Status", StatusSchema);
