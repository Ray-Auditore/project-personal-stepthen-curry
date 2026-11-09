const express = require("express");
const cors = require("cors");
const path = require("path");
const data = require("./data");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get("/api/curry", (req, res) => res.json(data));
app.get("/api/health", (req, res) => res.json({ ok: true }));

// Production: sajikan hasil build React
const dist = path.join(__dirname, "..", "client", "dist");
app.use(express.static(dist));
app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api")) return next();
  res.sendFile(path.join(dist, "index.html"), (err) => {
    if (err) res.status(404).send("Jalankan 'npm run build' dulu, atau pakai 'npm run dev'.");
  });
});

app.listen(PORT, () => console.log(`Server jalan di http://localhost:${PORT}`));
