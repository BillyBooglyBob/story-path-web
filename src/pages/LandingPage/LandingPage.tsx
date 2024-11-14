import { useNavigate } from "react-router-dom";
import styles from "./landingPage.module.css";
import { motion } from "framer-motion";

export default function LandingPage() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/project/add");
  };

  const transition = { duration: 1.4, ease: [0.6, 0.01, -0.05, 0.9] };

  return (
    <div className="flex ml-[70px] gap-5">
      <div className="flex-1">
        <motion.h2
          initial={{ x: -300, opacity: 1 }}
          animate={{ x: 0, transition: transition }}
          className="text-HeaderBg uppercase text-[20px]"
        >
          Virtual Museum
        </motion.h2>
        <div className="font-HomePageFont font-bold text-[80px] text-white">
          <motion.h1
            initial={{ x: -1000 }} // Start off-screen to the left with opacity 0
            animate={{ x: 0, transition: transition }} // Slide to position with full opacity
          >
            Where every
          </motion.h1>
          <motion.div
            initial={{ x: 400 }} // Start off-screen to the left with opacity 0
            animate={{ x: 0, transition: transition }} // Slide to position with full opacity
            className="flex"
          >
            <span className="relative top-[60px] inline-block w-[200px] h-[12px] bg-white mr-[54px] ml-[-89px]">
              &nbsp;
            </span>
            <h1>place</h1>
          </motion.div>
          <motion.h1
            initial={{ x: -1000 }} // Start off-screen to the left with opacity 0
            animate={{ x: 0, transition: transition }} // Slide to position with full opacity
          >
            tells a story
          </motion.h1>
        </div>
        <motion.button
          onClick={handleNavigate}
          className={`flex justify-between px-[30px] p-5 mt-3  uppercase border rounded-md w-[300px] cursor-pointer ${styles.mouseHover}`}
          initial={{ x: 400 }}
          animate={{ x: 0, transition: transition }}
        >
          <p>Get Started</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </motion.button>
      </div>
      <div className="flex-1 relative overflow-hidden shadow-lg">
        <motion.img
          src="https://assets.website-files.com/6193c9dbb809764879877eec/619b900211243f85f8489ee9_media_illustr.png"
          alt="Thinking Statue"
          className="w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
        />
        {/* orange arc */}
        <motion.div
          className="absolute left-[30px] top-[100px] h-[150px] bg-contain bg-no-repeat transition-all duration-800 ease-in-out"
          style={{
            backgroundImage:
              "url('https://assets.website-files.com/6193c9dbb809764879877eec/619b9002610d894498f32418_media_elem.png')",
            backgroundPosition: "0 50%",
            width: "150px",
            transformOrigin: "left", // Make it grow outward from the left side
            // clip-path: inset(0 50% 0 0)
            // clipPath: "inset(0 0 50% 0)"
          }}
          initial={{ clipPath: "inset(0 0 70% 0)" }} // Start with only the left half visible
          animate={{ clipPath: "inset(0 0 0% 0)" }} // Expand to reveal the full width
          transition={{ duration: 0.8 }} // Smooth transition
        ></motion.div>
        {/* yellow rectangle */}
        <motion.div
          className="bg-[#ffc75a] w-[150px] h-[30px] absolute right-[130px] bottom-[80px] rotate-[130deg]"
          initial={{ width: 0 }} // Start with no size and invisible
          animate={{ width: 150 }} // Grow to full size and make it visible
          transition={{ duration: 0.8 }} // Adjust duration and easing
          style={{ transformOrigin: "right" }} // Set origin point for growth
        ></motion.div>
      </div>
    </div>
  );
}
