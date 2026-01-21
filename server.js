import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Item from "./models/Item.js";

dotenv.config();

/* 1️⃣ СОЗДАЁМ APP */
const app = express();

/* 2️⃣ MIDDLEWARE */
app.use(express.json());

/* 3️⃣ MONGODB */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas connected"))
  .catch(err => console.error("MongoDB error:", err));

/* 4️⃣ ROUTES */
app.get("/", (req, res) => {
  res.json({ message: "API works" });
});

/* CREATE */
app.post("/api/items", async (req, res) => {
  try {
    const item = new Item(req.body);
    const savedItem = await item.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* READ ALL */
app.get("/api/items", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

/* READ ONE */
app.get("/api/items/:id", async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (!item) return res.status(404).json({ message: "Not found" });
  res.json(item);
});

/* UPDATE */
app.put("/api/items/:id", async (req, res) => {
  const updated = await Item.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

/* DELETE */
app.delete("/api/items/:id", async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

/* 5️⃣ START SERVER */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
