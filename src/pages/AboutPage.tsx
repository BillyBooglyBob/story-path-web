import { motion } from "framer-motion";

const AboutPage = () => {
  return (
    <div>
      <div>
        <motion.h1
          className="uppercase font-bold text-[9rem] text-center text-HeaderBg z-10 flex justify-between absolute top-[6rem]"
          initial={{ x: -600 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.8 }}
        >
          About
        </motion.h1>
        <motion.div
          className="text-slate-400 uppercase flex flex-col gap-[1.5rem] pr-[25rem] pb-[3rem] mt-[9.5rem]"
          initial={{ x: 400 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p>
            StoryPath is a location experience platform designed to allow users
            to create and explore virtual museum exhibits, location-based tours,
            and treasure hunts with clues.
          </p>
          <p>
            The platform features a Web app built in React that enables users to
            author these experiences, and a React Native Player for deploying
            them, making it easy to bring location-driven narratives to life.
          </p>
        </motion.div>
      </div>

      {/* Bottom border images */}
      <motion.img
        src="https://assets.website-files.com/6193c9dbb809764879877eec/619bf11703b95d04a9ce2bb0_footer_hand.png"
        alt="hand with finger pointing to the top right"
        className="absolute right-0 bottom-0 w-[20rem] h-[20rem] z-1 "
        initial={{ x: 100, y: 100, scaleX: -1 }}
        animate={{ x: 0, y: 0, scaleX: -1 }}
        transition={{ duration: 0.8 }}
      />
      <motion.img
        src="https://assets.website-files.com/6193c9dbb809764879877eec/619bf1202d5013a1d0a1acb1_footer_rectangle.png"
        alt="old and worn out looking hollow square"
        className="absolute left-[-60px] bottom-[-40px] w-[200px] h-[200px] z-1"
        initial={{ x: -100, scaleX: -1 }}
        animate={{ x: 0, scaleX: -1 }}
        transition={{ duration: 0.8 }}
      />
    </div>
  );
};

export default AboutPage;
