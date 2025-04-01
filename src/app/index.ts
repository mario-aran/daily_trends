// WARNING: This file is used by a script in "package.json". Do not rename or move

import express from "express";

const app = express();

app.get("/", (_req, res) => {
  res.json({ message: "Hello API" });
});

// Start the server
app.listen(3000, () => {
  console.log("Server running on port: 3000");
});
