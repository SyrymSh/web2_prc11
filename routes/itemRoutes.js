import { Router } from "express";
import {
  getAllItems,
  getItemById,
  createItem,
  putUpdateItem,
  patchUpdateItem,
  deleteItem
} from "../controllers/itemController.js";

const router = Router();

router.get("/", getAllItems);
router.get("/:id", getItemById);
router.post("/", createItem);
router.put("/:id", putUpdateItem);
router.patch("/:id", patchUpdateItem);
router.delete("/:id", deleteItem);

export default router;
