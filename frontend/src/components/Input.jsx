import React from "react";

function Input({
  id,
  name,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  className,
  ...props
}) {
  return (
    <div className="w-full flex flex-col gap-1">
      <label htmlFor={id} className="font-medium text-lg">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full font-medium px-2 py-2 rounded-md outline-none border-2 border-gray-500 focus:border-[#017ffd] transition-all duration-300 ease-in-out ${className}`}
        {...props}
      />
    </div>
  );
}

export default Input;
