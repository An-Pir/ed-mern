import express from "express";

const app = express();

const PORT = 5000;

app.get("/api/hello", (req, res) => {
  res.send("Привет от сервера на Express.");
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
