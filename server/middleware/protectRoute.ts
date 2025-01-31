import { NextFunction, Request, Response } from "express";
import prisma from "../db/prisma.js";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface DecodedToken extends JwtPayload {
  userId: string;
}

declare global {
  namespace Express {
    export interface Request {
      user: {
        id: string;
        username: string;
        fullName: string;
        profilePic: string;
      };
    }
  }
}

export const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.cookies?.jwt;

    if (!id) {
      res.status(401).json({ error: "Unauthorized - No token found" });
    }
    const decoded = jwt.verify(id, process.env.JWT_SECRET!) as DecodedToken;

    if (!decoded) {
      res.status(401).json({ error: "Unauthorized - Invalid token" });
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        username: true,
        fullName: true,
        profilePic: true,
      },
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
    }

    if (user) {
      req.user = user;
    }

    next();
  } catch (error) {
    console.log("Error in logout controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
