import mongoose from "mongoose";

const TowerSchema = new mongoose.Schema(
  {
    FAULTID: {
      type: String,
    },
    YYMMDD: {
      type: String,
      required: true,
    },
    FAULT: {
      type: String,
      required: true,
    },
    TOWERNAME: {
      type: String,
      required: true,
    },
    IMAGE1: {
      type: String,
    },
    IMAGE2: {
      type: String,
    },
    IMAGE3: {
      type: String,
    },
    ARM: {
      type: String,
    },
    CODE: {
      type: String,
    },
    DESCRIPTION: {
      type: String,
    },
    COMMENT: {
      type: String,
    },
    SCORE: {
      type: mongoose.Schema.Types.Decimal128,
    },
    CRITICALITY: {
      type: String,
    },
    SEVERITY: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Tower = mongoose.model("Tower", TowerSchema);

export default Tower;
