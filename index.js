require("dotenv").config(); // Load environment variables from .env
console.log("API KEY loaded:", process.env.API_KEY ? "YES" : "NO");

const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const port = 3000;

// Serve static files from "public" folder (HTML, CSS, JS)
app.use(express.static("public"));

// Parse incoming JSON and URL-encoded payloads
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route: POST /weather
app.post("/weather", async (req, res) => {
  const city = req.body.city;
  const apiKey = process.env.API_KEY;

  if (!city) {
    return res.status(400).json({ error: "City name is required" });
  }

  console.log("City requested:", city);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    console.log("API response:", data);

    res.json({
      city: data.name,
      temperature: data.main.temp,
      description: data.weather[0].description,
      humidity: data.main.humidity,
    });
  } catch (error) {
    console.error("API call failed:", error.response?.data || error.message);
    res.status(404).json({ error: "City not found" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`✅ SkyCheck running at: http://localhost:${port}`);
});
