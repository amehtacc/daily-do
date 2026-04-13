function Button({ children, variant, size, className, disabled, ...props }) {
  const baseStyle =
    "flex items-center justify-center rounded-full font-semibold outline-none cursor-pointer transition-all duration-200 ease-in-out";

  const variantStyles = {
    primary:
      "bg-[#017ffd] border-2 border-[#017ffd] text-white hover:bg-[#017ffd]/90",
    secondary: "bg-white text-[#017ffd] hover:bg-[#017ffd] hover:text-white",
    outline:
      "border-2 border-[#017ffd] text-[#017ffd] hover:bg-[#017ffd] hover:text-white",
  };

  const sizeStyles = {
    lg: "px-6 py-3 text-lg",
    md: "px-5 py-2 text-base",
    sm: "px-4 py-2 text-sm",
  };

  const disabledStyle = "opacity-50 cursor-not-allowed pointer-events-none ";

  return (
    <button
      className={`${baseStyle} ${variantStyles[variant]} ${sizeStyles[size]} ${disabled ? disabledStyle : ""} ${className} `}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
