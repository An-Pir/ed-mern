import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    // 1. Достаем заголовок из запроса (для удобства кладем в переменную)
    const authHeader = req.headers.authorization;

    // 2. Если заголовка нет вообще ИЛИ он не начинается с "Bearer " -> доступ закрыт
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401);
      throw new Error("Не авторизован, токен отсутствует");
    }

    // 3. Отрезаем слово "Bearer " и забираем сам токен (вторую часть)
    const token = authHeader.split(" ")[1];

    // 4. Расшифровываем токен нашим секретным ключом
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 5. Ищем пользователя в базе по расшифрованному id (без пароля)
    const user = await User.findById(decoded.id).select("-password");

    // 6. Если токен правильный, но пользователя уже удалили из базы -> доступ закрыт
    if (!user) {
      res.status(401);
      throw new Error("Пользователь с таким токеном не найден");
    }

    // 7. Всё отлично! Прикрепляем пользователя к запросу и пропускаем дальше
    req.user = user;
    next();
  } catch (error) {
    // Сюда попадут и наши throw new Error, и ошибки от jwt.verify (если токен подделан или просрочен)
    res.status(401);
    return next(new Error("Не авторизован , недействительный токен"));
  }
};
