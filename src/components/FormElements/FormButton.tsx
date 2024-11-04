import React from "react";

type ButtonType = "submit" | "reset" | "button" | undefined;

type FormButtonProp = {
  type?: ButtonType;
  onClick?: () => void;
  backgroundColor: string;
  backgroundColorHover: string;
  children: React.ReactNode;
};

export default function FormButton({
  type,
  onClick,
  backgroundColor,
  backgroundColorHover,
  children,
}: FormButtonProp) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-[80px] mr-[10px] text-white py-2 px-4 rounded-md ${backgroundColor} transition duration-300`}
      onMouseEnter={(e) => {e.currentTarget.classList.add(backgroundColorHover)}}
      onMouseLeave={(e) => {e.currentTarget.classList.remove(backgroundColorHover)}}
    >
      {children}
    </button>
  );
}
