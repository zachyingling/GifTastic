require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8080;

const axios = require("axios");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// HTML Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

// API Routes
app.get("/api/gifs/:gifQuery", (req, res) => {
  let queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + process.env.GIPHY_API_KEY + "&q=" + req.params.gifQuery;
  axios.get(queryURL).then(axiosResponse => {
    res.send(axiosResponse.data);
  }).catch(err => {
    res.send("error:" + err);
  });
});

app.listen(PORT, () => {
  console.log("App listening on PORT: " + PORT);
});