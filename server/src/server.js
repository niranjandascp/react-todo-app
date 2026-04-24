import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";

import connectToDatabase from "./config/db.js";
import todoRoutes from "./routes/todoRoutes.js";
import authRoutes from "./routes/authRoutes.js";

// Load env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 9002;

// Debug (optional)
console.log("MONGO_URI:", process.env.MONGO_URI);

// ✅ CORS (VERY IMPORTANT)
app.use(
  cors({
    origin: "http://localhost:5173", // React Vite frontend
    credentials: true,
  })
);

// Security
app.use(helmet());

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/todo", todoRoutes);

// ✅ Health check route (useful for testing)
app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

// ✅ Start server properly
const startServer = async () => {
  try {
    await connectToDatabase();

    app.listen(PORT, () => {
      console.log(`💻 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();