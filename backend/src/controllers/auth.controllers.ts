import bcrypt, { hash } from "bcryptjs";
import { Request, Response } from "express";
import { User } from "../models/models";
import { z } from "zod";
import generateTokenAndSetCookie from "../utils/generateToken";

const registerSchema = z.object({
  username: z.string().min(4),
  email: z.string(),
  password: z.string().min(6),
});

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = registerSchema.parse(req.body);

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    generateTokenAndSetCookie(newUser._id, res);
    await newUser.save();

    return res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      token: req.cookies.jwt
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Both username and password are required" });
    }

    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      _id: user._id,
      username: user.username,
      token: req.cookies.jwt
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = (req: Request, res: Response) => {
  try {
    res
      .clearCookie("jwt")
      .status(200)
      .json({ message: "Logged out successfully" });
  } catch (error: any) {
    console.error("Logout error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
