import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.autorization &&
    req.headers.autorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.autorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      if (!req.user) {
        res.status(401);
        throw new Error("Пользователь с таким токеном не найден");
      }
      return next();
    } catch (error) {
      res.status(401);
      return next(new Error("Не авторизован , не действительный токен"));
    }
  }

  if (!token) {
    res.status(401);
    return next(new Error("Не авторизован, токен отсутствует"));
  }
};
