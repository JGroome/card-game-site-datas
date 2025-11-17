import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import { leaders } from "./data/leaders.js";
import { leaderSchema } from "./validation/leaderSchema.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/health", (_, res) => res.json({ ok: true }));

app.get("/api", (_, res) => {
  res.json({
    endpoints: {
      allLeaders: "/api/leaders",
      singleLeader: "/api/leaders/:name",
      addLeader: "/api/leaders (POST)",
      health: "/health"
    }
  });
});

app.get("/api/leaders", (_, res) => {
  res.json(leaders);
});

app.get("/api/leaders/:name", (req, res) => {
  const name = req.params.name.toLowerCase();
  const found = leaders.find(l => l.name.toLowerCase() === name);

  if (!found) {
    return res.status(404).json({ error: "Leader not found" });
  }

  res.json(found);
});

// POST create leader
app.post("/api/leaders", (req, res) => {
  const { error, value } = leaderSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  leaders.push(value);
  res.status(201).json(value);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Leaders API running on port ${PORT}`);
});
