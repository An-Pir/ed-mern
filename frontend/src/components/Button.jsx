const Button = ({
  children,
  type = "button",
  onClick,
  variant = "primary",
  className = "",
}) => {
  const baseStyles =
    "font-semibold py-2 px-4 rounded-lg transition-colors cursor-pointer";
  const variants = {
    primary: "bg-emerald-500 hover:bg-emerald-600 text-white",
    danger: "bg-rose-600 hover:bg-rose-500 text-white",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
