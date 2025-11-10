// server.js
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { leaders } from "./data/leaders.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.use(express.static(path.join(__dirname, "public")));


app.get("/health", (_, res) => res.json({ ok: true }));

app.get("/api", (_, res) => {
  res.json({
    routes: [
      { method: "GET", path: "/api/leaders", description: "All leaders" },
      { method: "GET", path: "/api/leaders/:name", description: "Single leader by name" },
    ],
  });
});

app.get("/api/leaders", (_, res) => {
  res.json(leaders);
});

app.get("/api/leaders/:name", (req, res) => {
  const q = req.params.name.toLowerCase();
  const found = leaders.find((l) => l.name.toLowerCase() === q);
  if (!found) return res.status(404).json({ error: "Leader not found" });
  res.json(found);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Leaders API listening on port ${PORT}`);
});
