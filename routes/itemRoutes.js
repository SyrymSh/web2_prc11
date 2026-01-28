import { Router } from "express";
import {
  getAllItems,
  getItemById,
  createItem,
  putUpdateItem,
  patchUpdateItem,
  deleteItem
} from "../controllers/itemController.js";

import { apiKeyAuth } from "../middleware/auth.js";

const router = Router();

// PUBLIC
router.get("/", getAllItems);
router.get("/:id", getItemById);

// PROTECTED
router.post("/", apiKeyAuth, createItem);
router.put("/:id", apiKeyAuth, putUpdateItem);
router.patch("/:id", apiKeyAuth, patchUpdateItem);
router.delete("/:id", apiKeyAuth, deleteItem);

export default router;
