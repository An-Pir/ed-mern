import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

// Создаем "секретаря на ресепшене" — маршрутизатор Express
const router = express.Router();

// 1. Маршрут регистрации (POST-запрос)
// Когда кто-то стучится по адресу '/register', вызываем функцию registerUser
router.post("/register", registerUser);

// 2. Маршрут входа (POST-запрос)
// Когда кто-то стучится по адресу '/login', вызываем функцию loginUser
router.post("/login", loginUser);

// 3. Маршрут профиля (GET-запрос)
// Тут адрес '/me'. Но перед тем как пустить к getUserProfile,
// мы ставим охранника protect.
// Запрос пойдет дальше только если protect вызовет функцию next()
router.get("/me", protect, getUserProfile);

// Экспортируем нашего "секретаря", чтобы подключить его к главному зданию (server.js)
export default router;
