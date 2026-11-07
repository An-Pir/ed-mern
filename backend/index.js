import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(
    `[${new Date().toISOString()}] Пришел ${req.method} - запрос на адрес ${req.url}`,
  );
  next();
});

app.get("/api/hello", (req, res) => {
  res.send("Привет от сервера на Express.");
});

app.post("/api/data", (req, res) => {
  console.log("Полученные данные", res.body);
  res.status(201).json({
    message: "Данные успешно получены",
    yourData: req.body,
  });
});

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
  });
};

startServer();
