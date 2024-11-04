import React from "react";

type ListItemSectionProp = {
  children: React.ReactNode;
};

export default function ListItemSection({ children }: ListItemSectionProp) {
  return (
    <div className="flex-1 text-HeaderBg transition-colors flex flex-col justify-items-start gap-[20px]">
      {children}
    </div>
  );
}
