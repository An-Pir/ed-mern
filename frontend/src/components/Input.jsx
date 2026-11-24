const Input = ({
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  required = false,
}) => {
  const inputStyle =
    "p-3 rounded bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400";
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={inputStyle}
      required={required}
    />
  );
};

export default Input;
