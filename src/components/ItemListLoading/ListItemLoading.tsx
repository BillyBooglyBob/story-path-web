import React from "react";

type ListItemProp = {
  children: React.ReactNode;
};

export default function ListItemLoading({ children }: ListItemProp) {
  return (
    <li className="group flex gap-[20px] justify-between py-4 border-b border-dotted border-gray-300 last:border-none">
      {children}
    </li>
  );
}
