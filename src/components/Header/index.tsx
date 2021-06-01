import styles from "./style.module.scss"
import { RiShieldKeyholeFill } from "react-icons/ri";
import { BsToggleOff, BsToggleOn } from "react-icons/bs"
import { FaMoon, FaRegMoon } from "react-icons/fa"
import { HiSun, HiOutlineSun } from "react-icons/hi"
import { useTheme } from "../../contexts/themeContext";

export function Header() {
  const { darkTheme, setTheme } = useTheme()

  const darkMode = darkTheme && styles.dark;
  return (
    <div className={styles.container}>
      <div className={`${styles.logo} ${darkMode}`}>
        <h1>Password <RiShieldKeyholeFill size={25} /> Generator</h1>
      </div>

      <div className={`${styles.themeSwitch} ${darkMode}`}>
        {darkTheme
          ? <HiOutlineSun size={15} />
          : <HiSun size={15} />
        }
        {darkTheme
          ? <BsToggleOn onClick={setTheme} size={20} />
          : <BsToggleOff onClick={setTheme} size={20} />
        }
        {darkTheme
          ? <FaMoon size={12} />
          : <FaRegMoon size={12} />
        }

      </div>

    </div>
  )
}