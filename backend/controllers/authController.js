import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    // 1. Проверяем, что всё заполнено
    if (!name || !email || !password) {
      res.status(400);
      throw new Error(
        "Пожалуйста, заполните все обязательные поля: имя, email и пароль",
      );
    }

    // --- ПРОВЕРКА ПАРОЛЯ ---
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{6,}$/;
      if(!passwordRegex.test(password)){
        res.status(400);
        throw new Error("Пароль должен содержать минимум 6 символов, заглавную и строчную букву, а также цифру");
      }

    // 2. Проверяем, нет ли уже такого email в базе
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("Пользователь с таким email уже зарегистрирован");
    }

    // 3. БЕЗОПАСНОСТЬ: Вручную шифруем пароль перед сохранением
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Создаем пользователя в базе, сохраняя ХЕШ, а не сырой пароль
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // 5. БЕЗОПАСНОСТЬ: Вручную генерируем JWT токен
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    // 6. Отвечаем фронтенду

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: token,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Вход пользователя
// @route   POST /api/auth/login
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error("Пожалуйста, укажите email и пароль");
    }
    // 1. Ищем пользователя по email
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401);
      throw new Error("Неверный email или пароль");
    }
    // 2. БЕЗОПАСНОСТЬ: Сравниваем введенный пароль с хешем из базы
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401);
      throw new Error("Неверный email или пароль");
    }
    // 3. БЕЗОПАСНОСТЬ: Генерируем токен для входа
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    // 4. Отвечаем фронтенду
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: token,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Получение профиля
// @route   GET /api/auth/me
// @access  Private (нужен токен)
export const getUserProfile = async (req, res, next) => {
  try {
    // Пользователь уже найден в базе с помощью middleware (protect)
    const user = await User.findById(req.user._id).select("-password");

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404);
      throw new Error("Пользователь не найден");
    }
  } catch (error) {
    next(error);
  }
};
