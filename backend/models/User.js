import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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
      minlength: [6, "Пароль должен содержать минимум 6 символов"],
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{6,}$/,
        "Пароль должен содержать минимум 6 символов, хотя бы одну заглавную букву, одну строчную букву и одну цифру",
      ],
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

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
