import { User } from "../models/models";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

import { Request, Response, NextFunction } from 'express';

interface CustomRequest extends Request {
  user?: any;
}

const protectedRoute = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ error: "No token" });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || ""
    ) as JwtPayload;

    if (!decoded) {
      return res.status(401).json({ error: "invalid token" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ error: "No user" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
  }
};

export default protectedRoute;
