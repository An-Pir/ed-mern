import { useState } from "react";
import api from "../api/axios";
import Input from "./Input";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("api/auth/login", formData);
      localStorage.setItem("token", response.data.token)
      console.log("Вход выполнен успешно:", response.data);
      alert("С возвращением!");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Ошибка соединения с сервером";
      console.error("Ошибка при входе: ", errorMessage);
      alert(errorMessage);
    }
  };
  return (
    <div className="bg-slate-800 p-8 rounded-lg shadow-lg w-full max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-emerald-400">
        Вход в аккаунт
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="password"
          placeholder="Пароль"
          value={formData.password}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="mt-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-4 rounded transition-colors"
        >
          Войти
        </button>
      </form>
    </div>
  );
};

export default Login;
