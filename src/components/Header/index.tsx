import styles from "./style.module.scss"
import { RiShieldKeyholeFill } from "react-icons/ri";

export function Header() {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <h1>Password <RiShieldKeyholeFill size={25} color="#0e0e10" /> Generator</h1>
      </div>

    </div>
  )
}