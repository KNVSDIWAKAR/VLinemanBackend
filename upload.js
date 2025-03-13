import mongoose from "mongoose";
import fs from "fs";
import Tower from "./models/Tower.js";

const uri =
  "mongodb+srv://divvukancherla630:diwakar13@cluster0.kpcsj.mongodb.net/";

async function insertData() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const jsonData = JSON.parse(fs.readFileSync("towers.json", "utf-8"));

    if (Array.isArray(jsonData)) {
      await Tower.insertMany(jsonData);
    } else {
      await Tower.create(jsonData);
    }

    console.log("Data inserted successfully!");
  } catch (error) {
    console.error("Error inserting data:", error);
  } finally {
    mongoose.connection.close();
  }
}

insertData();
