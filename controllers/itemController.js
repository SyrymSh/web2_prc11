import Item from "../models/Item.js";

// GET /api/items
export async function getAllItems(req, res) {
  try {
    const items = await Item.find();
    return res.status(200).json(items);
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
}

// GET /api/items/:id
export async function getItemById(req, res) {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ error: "Item not found" });
    return res.status(200).json(item);
  } catch (err) {
    return res.status(400).json({ error: "Invalid ID" });
  }
}

// POST /api/items
export async function createItem(req, res) {
  try {
    const { name, price } = req.body;

    // basic validation
    if (typeof name !== "string" || name.trim() === "")
      return res.status(400).json({ error: "name is required" });

    if (typeof price !== "number")
      return res.status(400).json({ error: "price must be a number" });

    const created = await Item.create({ name: name.trim(), price });
    return res.status(201).json(created);
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
}

// PUT /api/items/:id  (FULL UPDATE)
export async function putUpdateItem(req, res) {
  try {
    const { name, price } = req.body;

    // PUT should fully update: require both fields
    if (typeof name !== "string" || name.trim() === "")
      return res.status(400).json({ error: "name is required for PUT" });

    if (typeof price !== "number")
      return res.status(400).json({ error: "price is required for PUT and must be a number" });

    const updated = await Item.findByIdAndUpdate(
      req.params.id,
      { name: name.trim(), price },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ error: "Item not found" });
    return res.status(200).json(updated);
  } catch (err) {
    return res.status(400).json({ error: "Invalid ID" });
  }
}

// PATCH /api/items/:id  (PARTIAL UPDATE)
export async function patchUpdateItem(req, res) {
  try {
    const { name, price } = req.body;

    // PATCH allows partial: only validate provided fields
    const update = {};

    if (name !== undefined) {
      if (typeof name !== "string" || name.trim() === "")
        return res.status(400).json({ error: "name must be a non-empty string" });
      update.name = name.trim();
    }

    if (price !== undefined) {
      if (typeof price !== "number")
        return res.status(400).json({ error: "price must be a number" });
      update.price = price;
    }

    if (Object.keys(update).length === 0) {
      return res.status(400).json({ error: "Provide at least one field to update" });
    }

    const updated = await Item.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ error: "Item not found" });
    return res.status(200).json(updated);
  } catch (err) {
    return res.status(400).json({ error: "Invalid ID" });
  }
}

// DELETE /api/items/:id
export async function deleteItem(req, res) {
  try {
    const deleted = await Item.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Item not found" });

    // 204 No Content is correct for delete
    return res.status(204).send();
  } catch (err) {
    return res.status(400).json({ error: "Invalid ID" });
  }
}
