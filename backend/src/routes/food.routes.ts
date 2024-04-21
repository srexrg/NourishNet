import express, { NextFunction, Request, Response } from "express";
import protectedRoute from "../middleware/protectedRoute";
import { addFood,deleteFood,getAllFood, getFoodById, updateFood } from "../controllers/donation.controller";

const router = express.Router();


router.post("/donate-food", protectedRoute, addFood as any);
router.get("/", protectedRoute, getAllFood as any);
router.get("/:id", protectedRoute, getFoodById as any);
router.patch("/update/:id", protectedRoute, updateFood as any);
router.delete("/delete/:id", protectedRoute, deleteFood as any);

export default router;