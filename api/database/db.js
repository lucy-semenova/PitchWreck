import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";

sqlite3.verbose();
// Get the current file path and directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Use DB_PATH from environment variables in production,
// or use the local SQLite file during development
const dbPath =
  process.env.DB_PATH || path.join(__dirname, "pitchwreck.sqlite");

const db = new sqlite3.Database(dbPath, (error) => {
  if (error) {
    console.error("Database connection failed:", error.message);
  } else {
    console.log("Connected to SQLite database");
  }
});

export default db;