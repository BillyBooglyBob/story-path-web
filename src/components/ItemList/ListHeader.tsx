import React from "react";

type ListHeaderProp = {
  children: React.ReactNode;
};

export default function ListHeader({ children }: ListHeaderProp) {
  return (
    <h1 className="relative uppercase font-bold text-3xl text-center mb-6 text-white z-10 flex justify-between">
      {children}
    </h1>
  );
}
