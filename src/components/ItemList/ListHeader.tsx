import React from "react";

type ListHeaderProp = {
  children?: React.ReactNode;
  title?: String;
  header: String
};

export default function ListHeader({ children, title, header }: ListHeaderProp) {
  return (
    <h1 className="relative uppercase font-bold text-3xl text-center mb-6 text-white z-10 flex justify-between">
      <div className="flex flex-col justify-start items-start">
          <h1 className="text-HeaderBg">{header}</h1>
          <h1>{title}</h1>
        </div>
      {children}
    </h1>
  );
}
