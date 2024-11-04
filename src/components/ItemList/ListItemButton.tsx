import React from "react";

type ListItemButtonProp = {
  hoverBg: string;
  onClick: () => void;
  children: React.ReactNode;
};

export default function ListItemButton({
  hoverBg,
  onClick,
  children,
}: ListItemButtonProp) {
  return (
    <button
      onClick={onClick}
      className={` w-[150px] transition-colors border px-4 py-1 rounded`}
      onMouseEnter={(e) => {e.currentTarget.classList.add(hoverBg)}}
      onMouseLeave={(e) => {e.currentTarget.classList.remove(hoverBg)}}
    >
      {children}
    </button>
  );
}
