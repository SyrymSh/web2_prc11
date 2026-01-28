import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import itemRoutes from "./routes/itemRoutes.js";
import Item from "./models/Item.js";

dotenv.config();

const app = express();
app.use(express.json());

// Health / root
app.get("/", (req, res) => res.json({ message: "API works" }));

// REST resource
app.use("/api/items", itemRoutes);

// Start only after DB connect
const PORT = process.env.PORT || 3011;

async function start() {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      console.error("MONGO_URI is missing (set it in .env locally or platform Variables)");
      process.exit(1);
    }

    await mongoose.connect(uri);
    console.log("MongoDB connected");

    
    await Item.createCollection();
    console.log("Items collection is ready");

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Startup error:", err);
    process.exit(1);
  }
}

start();
