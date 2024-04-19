import express from "express";
// import { login, logout } from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/add-food", add);
router.post("/request-food", request);

export default router;