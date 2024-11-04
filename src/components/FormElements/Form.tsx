import React from "react";

type FormProps = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
};

export default function Form({ handleSubmit, children }: FormProps) {
  return (
    <form
      onSubmit={handleSubmit}
      className="p-8 max-w-screen mx-auto text-white"
    >
      {children}
    </form>
  );
}
