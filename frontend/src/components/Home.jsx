import { useEffect, useState } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem("Token")),
  );
  const [userName, setUserName] = useState(
    localStorage.getItem("UserName" || ""),
  );

  const handleLogout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("UserName");
    setIsAuthenticated(false);
    setUserName("");
    navigate("/");
  };
  useEffect(() => {
    setIsAuthenticated(Boolean(localStorage.getItem("Token")));
    setUserName(localStorage.getItem("UserName" || ""));
  }, []);

  return (
    <div className=" text-center">
      <h1 className="text-4xl font-bold text-emerald-400 mb-2">
        Главная страница
      </h1>
      {isAuthenticated ? (
        <div>
          <p className="text-pink-300 text-2xl mb-5">
            Вы авторизованы, {userName}
          </p>
          <Button variant="danger" onClick={handleLogout}>
            Выйти
          </Button>
        </div>
      ) : (
        <p className="text-pink-300">
          Пожалуйста, авторизуйтесь или зарегистрируйтесь.
        </p>
      )}
    </div>
  );
};

export default Home;
