import jwt from "jsonwebtoken";
import { Request, Response } from "express";
const generateTokenAndSetCookie = (userId: any, req: Request) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET || "", {
    expiresIn: "15d",
  });

  req.cookies.jwt=token
};

export default generateTokenAndSetCookie;
