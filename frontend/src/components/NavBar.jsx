import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem("Token")),
  );

  useEffect(()=>{
    setIsAuthenticated(Boolean(localStorage.getItem("Token")));
  },[location.pathname]);

  if(isAuthenticated){
    return null;
  }
  return (
    <nav className="mt-6 px-6 py-2 border rounded-lg border-emerald-400 flex gap-6 text-slate-300">
      {location.pathname !== "/login" && (
        <Link to="/login" className="hover:text-emerald-400 transition-colors ">
          Вход
        </Link>
      )}
      {location.pathname !== "/register" && (
        <Link
          to="/register"
          className="hover:text-emerald-400 transition-colors "
        >
          Регистрация
        </Link>
      )}
    </nav>
  );
};

export default NavBar;
