import { motion } from "framer-motion";
import React from "react";

type ListHeaderProp = {
  children?: React.ReactNode;
  title?: boolean;
  header: String;
};

export default function ListHeaderLoading({
  children,
  title,
  header,
}: ListHeaderProp) {
  return (
    <h1 className="relative uppercase font-bold text-3xl text-center mb-6 text-white z-10 flex justify-between">
      <div className="flex flex-col justify-start items-start">
        <h1 className="text-HeaderBg">{header}</h1>
        {title && (
          <motion.h1
            className="mt-[0.3rem] w-full h-[2rem] rounded-[0.5rem] opacity-[0.5]"
            animate={{
              backgroundColor: ["hsl(200, 20%, 40%)", "hsl(200, 20%, 60%)"],
            }}
            transition={{
              duration: 1,
              ease: "linear",
              repeat: Infinity,
              repeatType: "mirror",
            }}
          ></motion.h1>
        )}
      </div>
      {children}
    </h1>
  );
}
