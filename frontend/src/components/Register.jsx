import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/axios";
import Input from "./Input";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("api/auth/register", formData);
      console.log("Ура! Регистрация успешна:", response.data);
      alert("Регистрация прошла успешно!");
      navigate("/");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Ошибка соединения с сервером";
      console.error("Ошибка при регистрации:", errorMessage);
      alert(errorMessage);
    }
  };

  return (
    <div className="bg-slate-800 p-8 rounded-lg shadow-lg w-full max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-emerald-400">
        Регистрация
      </h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          name="name"
          placeholder="Ваше имя"
          value={formData.name}
          onChange={handleChange}
        />
        <Input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="password"
          placeholder="Пароль (минимум 8 символов)"
          value={formData.password}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="mt-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-4 rounded transition-colors"
        >
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};

export default Register;
