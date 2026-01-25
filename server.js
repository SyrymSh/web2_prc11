import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Item from "./models/Item.js";

dotenv.config();


const app = express();


app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas connected"))
  .catch(err => console.error("MongoDB error:", err));

app.get("/", (req, res) => {
  res.json({ message: "API works" });
});

app.post("/api/items", async (req, res) => {
  try {
    const item = new Item(req.body);
    const savedItem = await item.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/api/items", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

app.get("/api/items/:id", async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (!item) return res.status(404).json({ message: "Not found" });
  res.json(item);
});

app.put("/api/items/:id", async (req, res) => {
  const updated = await Item.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// Version endpoint (Practice Task 12)
app.get("/version", (req, res) => {
  res.json({
    version: "1.1",
    updatedAt: "25.01.2025"
  });
});

app.delete("/api/items/:id", async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

const PORT = process.env.PORT || 3011;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
