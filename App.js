import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import towerRoutes from "./routes/towerRoutes.js";
import statusRoutes from "./routes/statusRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/api/users", userRoutes);
app.use("/api/towers", towerRoutes);
app.use("/api/status", statusRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});

app.listen(PORT, () => console.log(`Server Running On Port ${PORT}`));
