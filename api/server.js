// Main entry point of the backend

import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import randomRoutes from "./routes/random.js";

const app = express();
const PORT = process.env.PORT || 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Allow requests from the frontend.

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  })
);

// Read JSON request bodies
app.use(express.json());

// Health check route
app.get("/api/health", (req, res) => {
  res.send("PitchWreck API is running");
});

// Random presentation routes
app.use("/api/random", randomRoutes);

// Serve built React app from api/public
app.use(express.static(path.join(__dirname, "public")));

// React fallback route
// This lets React handle frontend routes and page refreshes.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});