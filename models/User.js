import mongoose from "mongoose";
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
      default: "Role5",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
