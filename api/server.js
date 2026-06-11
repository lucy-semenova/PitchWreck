// Main entry point of the backend

import express from "express";
import cors from "cors";
import randomRoutes from "./routes/random.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Allow requests from the frontend.
// In production, FRONTEND_URL should be set in environment variables.
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  })
);

// Read JSON request bodies
app.use(express.json());

// Health check route
app.get("/", (req, res) => {
  res.send("PitchWreck API is running");
});

// Random presentation routes
app.use("/api/random", randomRoutes);

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});