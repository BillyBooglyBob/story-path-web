import {motion} from "framer-motion"


export default function ListItemTitleLoading() {
  return (
    <motion.div className="flex-1 text-2xl h-[2rem] w-[50%] rounded-[0.5rem] opacity-[0.5]"
      animate={{
       backgroundColor: ["hsl(200, 20%, 40%)", "hsl(200, 20%, 60%)"]
      }}
      transition={{
        duration: 1,
        ease: "linear",
        repeat: Infinity,
        repeatType: "mirror"
      }}
    >
      
      </motion.div>
  );
}
