import styles from "./style.module.scss"
import { RiShieldKeyholeFill } from "react-icons/ri";
import { BsToggleOff, BsToggleOn } from "react-icons/bs"
import { useTheme } from "../../contexts/themeContext";

export function Header() {
  const { darkTheme, setTheme } = useTheme()

  const darkMode = darkTheme && styles.dark;
  return (
    <div className={styles.container}>
      <div className={`${styles.logo} ${darkMode}`}>
        <h1>Password <RiShieldKeyholeFill size={25} />  Generator</h1>
      </div>

      <div className={`${styles.settings} ${darkMode}`}>
        <span>Dark Theme</span>
        {darkTheme
          ? (<BsToggleOn onClick={setTheme} size={20} />)
          : (<BsToggleOff onClick={setTheme} size={20} />)}
      </div>

    </div>
  )
}