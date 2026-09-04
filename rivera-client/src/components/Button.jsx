import { Link } from "react-router-dom";

const variantClasses = {
  primary:
    "bg-[#18244A] text-white hover:bg-[#243665] border-[#18244A]",
  secondary:
    "bg-white text-[#18244A] hover:bg-[#F3E9BF] border-[#C8A437]",
};

const Button = ({
  children,
  to,
  type = "button",
  variant = "secondary",
  className = "",
  disabled = false,
  onClick,
}) => {
  const classes = [
    "inline-flex items-center justify-center rounded-full border-2 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] transition",
    variantClasses[variant] ?? variantClasses.secondary,
    disabled ? "cursor-not-allowed opacity-50" : "",
    className,
  ]
    .join(" ")
    .trim();

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;