import { motion } from "framer-motion";

export default function ListItemSectionInfoLoading() {
  return (
    <div className="flex flex-col gap-[0.4rem] opacity-[0.5]">
      <motion.div
        className="w-[60%] h-[0.7rem] rounded-[0.5rem]"
        animate={{
          backgroundColor: ["hsl(200, 20%, 40%)", "hsl(200, 20%, 60%)"],
        }}
        transition={{
          duration: 1,
          ease: "linear",
          repeat: Infinity,
          repeatType: "mirror",
        }}
      ></motion.div>
      <motion.div
        className="w-full h-[0.7rem] rounded-[0.5rem]"
        animate={{
          backgroundColor: ["hsl(200, 20%, 40%)", "hsl(200, 20%, 60%)"],
        }}
        transition={{
          duration: 1,
          ease: "linear",
          repeat: Infinity,
          repeatType: "mirror",
        }}
      ></motion.div>
      <motion.div
        className="w-full h-[0.7rem] rounded-[0.5rem]"
        animate={{
          backgroundColor: ["hsl(200, 20%, 40%)", "hsl(200, 20%, 60%)"],
        }}
        transition={{
          duration: 1,
          ease: "linear",
          repeat: Infinity,
          repeatType: "mirror",
        }}
      ></motion.div>
    </div>
  );
}
