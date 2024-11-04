import React from "react";

type ListItemButtonContainerProp = {
  children: React.ReactNode;
};

export default function ListItemButtonContainer({
  children,
}: ListItemButtonContainerProp) {
  return (
    <div className="flex-1 flex flex-col justify-center items-center space-y-4 mt-2 text-HeaderBg group-hover:text-white">
      {children}
    </div>
  );
}
