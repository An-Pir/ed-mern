import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Пожалуйста, укажите имя"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Пожалуйста, укажите email"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Пожалуйста, укажите корректный email адрес",
      ],
    },
    password: {
      type: String,
      required: [true, "Пожалуйста, задайте пароль"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

export default User;
