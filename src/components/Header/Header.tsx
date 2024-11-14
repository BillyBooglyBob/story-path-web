import logo from "../../assets/images/logo.png";
import styles from "./header.module.css";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <motion.header 
    initial={{y: -50, opacity: 0}}
    animate={{y: 0, opacity: 1, transition: {
      duration: 0.7
    }}}
    className="flex justify-between items-center p-7 px-[100px]">
      <NavLink to="/" className="flex items-center cursor-pointer gap-4">
        <img src={logo} alt="Logo" className="h-20" />
        <h1 className="font-bold text-lg text-white uppercase">
          Story <br /> Path
        </h1>
      </NavLink>
      <h2 className={`uppercase cursor-pointer ${styles.underlineHover}`}>
        <NavLink to="/project">Projects</NavLink>
      </h2>
    </motion.header>
  );
}
