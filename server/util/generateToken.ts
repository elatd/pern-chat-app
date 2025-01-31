import { Response } from "express";
import jwt from "jsonwebtoken";

export const generateToken = (userId: string, res: Response) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    httpOnly: true, // not accessible by js, prevent XSS attack
    sameSite: "strict", // save from csrf
    secure: process.env.NODE_ENV !== "development", // https
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
  });

  return token;
};
