import logo from "../../assets/images/logo.png";
import styles from "./header.module.css";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-7 px-[100px]">
      <NavLink to="/" className="flex items-center cursor-pointer gap-4">
        <img src={logo} alt="Logo" className="h-20" />
        <h1 className="font-bold text-lg text-white uppercase">
          Story <br /> Path
        </h1>
      </NavLink>
      <h2 className={`uppercase cursor-pointer ${styles.underlineHover}`}>
        <NavLink to="/project">Projects</NavLink>
      </h2>
    </header>
  );
}
