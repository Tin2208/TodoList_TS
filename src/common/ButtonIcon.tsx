import React from "react";

type ButtonIconProps = {
  icon: React.ReactNode;
  onClick: () => void;
  className?: string;
};
const ButtonIcon: React.FC<ButtonIconProps> = ({
  icon,
  onClick,
  className = "",
}) => {
  return (
    <div
      className={`bg-[#eee] hover:bg-[#dedfe1] rounded-[4px] transition-bg duration-300 ease-in-out p-[5px] cursor-pointer ${className}`}
      onClick={onClick}
    >
      {icon}
    </div>
  );
};

export default ButtonIcon;
