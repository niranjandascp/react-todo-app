import connectToDatabase from "../config/db.js";
import argon2 from "argon2";
import { v7 as uuidv7 } from "uuid";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const db = await connectToDatabase();

    console.log("db from string", db);

    const user = await db.collection("users").findOne({ email });

    console.log("user>>>",user);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const passwordMatch = argon2.verify(user.password, password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "12h",
    });

    console.log("jwt Token", token);

    res.json({ message: "User logged in successfully", jwtToken: token });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Error logging in user" });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const passwordHash = await argon2.hash(password);

    const user = {
      _id: uuidv7(),
      name,
      email,
      password: passwordHash,
    };

    console.log("formated user", user);

    const db = await connectToDatabase();

    const result = await db.collection("users").insertOne(user);

    // res.json({ message: "User created successfully",});
    res.json({ message: "User created successfully", user: result });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user" });
  }
};
