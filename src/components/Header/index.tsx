import styles from "./style.module.scss"
import { RiShieldKeyholeFill } from "react-icons/ri";
import { BsToggleOff, BsToggleOn } from "react-icons/bs"
import { useContext } from "react";
import { ThemeContext } from "../../contexts/themeContext";

export function Header() {
  const { darkTheme, setTheme } = useContext(ThemeContext)

  const darkMode = darkTheme && styles.dark;
  return (
    <div className={styles.container}>
      <div className={`${styles.logo} ${darkMode}`}>
        <h1>Password <RiShieldKeyholeFill size={25} color={`${darkTheme ? "var(--text-white)" : "var(--text-black)"}`} /> Generator</h1>
      </div>

      <div className={`${styles.settings} ${darkMode}`}>
        <span>Theme</span>
        {darkTheme
          ? (<BsToggleOn onClick={setTheme} size={20} color={`${darkTheme ? "var(--text-white)" : "var(--text-black)"}`} />)
          : (<BsToggleOff onClick={setTheme} size={20} color={`${darkTheme ? "var(--text-white)" : "var(--text-black)"}`} />)}
      </div>

    </div>
  )
}