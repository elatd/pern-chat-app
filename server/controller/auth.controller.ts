import { Request, Response } from "express";
import prisma from "../db/prisma.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../util/generateToken.js";

export const signup = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { username, name, password, confirmPassword, gender } = req.body;
    if (!username || !name || !password || !confirmPassword || !gender) {
      return res.status(400).send("All fields are required");
    }

    if (password != confirmPassword) {
      return res.status(400).send("Passwords do not match");
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (existingUser) {
      return res.status(400).send("Username is already taken");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const profilePicUrl =
      gender === "male"
        ? `https://avatar.iran.liara.run/public/boy?username=${username}`
        : `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const user = await prisma.user.create({
      data: {
        fullName: name,
        username: username,
        gender: gender,
        password: hashedPassword,
        profilePic: profilePicUrl,
      },
    });
    if (user) {
      generateToken(user.id, res);

      return res.status(201).json({
        id: user.id,
        username: user.username,
        fullName: user.fullName,
        profilePic: user.profilePic,
        gender: user.gender,
        createdAt: user.createdAt,
      });
    } else {
      return res.status(500).send("Invalid user data");
    }
  } catch (error: unknown) {
    console.error("Error signing up user:", error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { username, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(404).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Password is incorrect" });
    }

    generateToken(user.id, res); // Ensure this sets cookies before response

    return res.status(200).json({
      id: user.id,
      username: user.username,
      fullName: user.fullName,
      profilePic: user.profilePic,
      gender: user.gender,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error("Error in login controller", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = (req: Request, res: Response): Response => {
  try {
    res.clearCookie("jwt");
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log("Error in logout controller", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMe = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req?.user?.id },
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      id: user?.id,
      username: user?.username,
      fullName: user?.fullName,
      profilePic: user?.profilePic,
      gender: user?.gender,
      createdAt: user?.createdAt,
    });
  } catch (error) {
    console.log("Error in logout controller", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
