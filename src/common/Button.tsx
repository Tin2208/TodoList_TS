import React from "react";

interface ButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className = "",
}) => {
  return (
    <button
      className={`bg-[#646ff0] text-white font-medium p-2 px-5 rounded-[6px] cursor-pointer transition duration-200 ease-in-out  ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
