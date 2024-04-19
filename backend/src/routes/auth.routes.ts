import express from "express";
import {register, login, logout } from "../controllers/auth.controllers";

const router = express.Router();

router.post("/register", register);
router.post("/logout", logout);

export default router;