import styles from "./style.module.scss"
import { RiShieldKeyholeFill } from "react-icons/ri";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/themeContext";

export function Header() {
  const { darkTheme } = useContext(ThemeContext)

  const darkMode = darkTheme && styles.dark;
  return (
    <div className={styles.container}>
      <div className={`${styles.logo} ${darkMode}`}>
        <h1>Password <RiShieldKeyholeFill size={25} color={`${darkTheme ? "var(--text-white)" : "var(--text-black)"}`} /> Generator</h1>
      </div>

    </div>
  )
}