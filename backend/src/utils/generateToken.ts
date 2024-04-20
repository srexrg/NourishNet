import jwt from "jsonwebtoken";
import { Response } from "express";
const generateTokenAndSetCookie = (userId:any, res:Response) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET || "", {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure:process.env.NODE_ENV !== "development"
  });
};

export default generateTokenAndSetCookie;
