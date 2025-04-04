import React from "react";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";

type IconCloseProps = {
  size?: number;
  color?: string;
  onClick?: () => void;
  hoverColor?: string;
};

const IconClose: React.FC<IconCloseProps> = ({
  size = 25,
  color = "#585858",
  onClick,
  hoverColor = "#e32525",
}) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      className="bg-[#eee] hover:bg-[#e32525] hover:text-white rounded-[4px] cursor-pointer absolute right-[0px] -top-[45px] p-[5px]"
      onClick={onClick}
    >
      <IoMdClose
        size={size}
        color={hover ? hoverColor : color}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{ cursor: "pointer" }}
      />
    </div>
  );
};

export default IconClose;
