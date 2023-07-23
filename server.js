const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

app.get("/api/countries", (req, res) => {
  const filePath = path.join(__dirname, "countries.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading JSON file:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    try {
      const countriesData = JSON.parse(data);
      return res.json(countriesData);
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      return res.status(500).json({ error: "Internal server error" });
    }
  });
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`API is running on http://localhost:${PORT}/api/countries`);
});
