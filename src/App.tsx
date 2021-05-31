import { useEffect, useRef, useState } from "react";
import { Header } from "./components/Header";

import { alphabet, numbers, symbols } from "./utils/arrays"
import { useDencrypt } from "use-dencrypt-effect"

import { useTheme } from "./contexts/themeContext";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import Loader from "react-loader-spinner";

import styles from "./styles/home.module.scss";
import "./styles/colorPasswordStrength.css"

type testedResultProps = {
  score: number
}

export function App() {

  const { darkTheme } = useTheme()

  const darkMode = darkTheme && styles.dark;

  const zxcvbn = require("zxcvbn");

  const { result, dencrypt } = useDencrypt();

  const [passwordLength, setPasswordLength] = useState("6");
  const [newPassword, setNewPassword] = useState("Your new password will appear here.")

  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)

  const inputRef = useRef<HTMLInputElement>(null);

  const [loadCreatePassword, setLoadCreatePassword] = useState(false)

  const [copySuccessDisplay, setCopySuccessDisplay] = useState(false)

  const [passwordStrengthDisplayText, setPasswordStrengthDisplayText] = useState("The password strength level appears here.");

  function copyToClipboard() {
    if (inputRef) {
      setCopySuccessDisplay(true);
      inputRef.current?.select()
      document.execCommand('copy');
    }
  }

  function returnDefaultLetters() {
    if ((!includeUppercase && !includeLowercase) && (includeNumbers && includeSymbols)) {
      const characterArray = [numbers[Math.floor(Math.random() * numbers.length)], symbols[Math.floor(Math.random() * symbols.length)]]
      const shufflePositionResult = characterArray[Math.floor(Math.random() * characterArray.length)];
      return shufflePositionResult
    }
    if (includeUppercase && (includeNumbers && includeSymbols)) {
      const characterArray = [numbers[Math.floor(Math.random() * numbers.length)], symbols[Math.floor(Math.random() * symbols.length)], alphabet[Math.floor(Math.random() * alphabet.length)].toLocaleUpperCase()]
      const shufflePositionResult = characterArray[Math.floor(Math.random() * characterArray.length)];
      return shufflePositionResult
    }
    if (includeLowercase && (includeNumbers && includeSymbols)) {
      const characterArray = [numbers[Math.floor(Math.random() * numbers.length)], symbols[Math.floor(Math.random() * symbols.length)], alphabet[Math.floor(Math.random() * alphabet.length)].toLocaleLowerCase()]
      const shufflePositionResult = characterArray[Math.floor(Math.random() * characterArray.length)];
      return shufflePositionResult
    }
    if (includeLowercase && includeUppercase && includeNumbers && includeSymbols) {
      const characterArray = [numbers[Math.floor(Math.random() * numbers.length)], symbols[Math.floor(Math.random() * symbols.length)], alphabet[Math.floor(Math.random() * alphabet.length)].toLocaleLowerCase(), alphabet[Math.floor(Math.random() * alphabet.length)].toLocaleUpperCase()]
      const shufflePositionResult = characterArray[Math.floor(Math.random() * characterArray.length)];
      return shufflePositionResult
    }
    if (includeUppercase && includeNumbers) {
      const characterArray = [numbers[Math.floor(Math.random() * numbers.length)], alphabet[Math.floor(Math.random() * alphabet.length)].toLocaleUpperCase()]
      const shufflePositionResult = characterArray[Math.floor(Math.random() * characterArray.length)];
      return shufflePositionResult
    }
    if (includeUppercase && includeSymbols) {
      const characterArray = [symbols[Math.floor(Math.random() * symbols.length)], alphabet[Math.floor(Math.random() * alphabet.length)].toLocaleUpperCase()]
      const shufflePositionResult = characterArray[Math.floor(Math.random() * characterArray.length)];
      return shufflePositionResult
    }
    if (includeLowercase && includeNumbers) {
      const characterArray = [numbers[Math.floor(Math.random() * numbers.length)], alphabet[Math.floor(Math.random() * alphabet.length)].toLocaleLowerCase()]
      const shufflePositionResult = characterArray[Math.floor(Math.random() * characterArray.length)];
      return shufflePositionResult
    }
    if (includeLowercase && includeSymbols) {
      const characterArray = [symbols[Math.floor(Math.random() * symbols.length)], alphabet[Math.floor(Math.random() * alphabet.length)].toLocaleLowerCase()]
      const shufflePositionResult = characterArray[Math.floor(Math.random() * characterArray.length)];
      return shufflePositionResult
    }
    if (includeSymbols) {
      return symbols[Math.floor(Math.random() * symbols.length)]
    }
    if (includeNumbers) {
      return numbers[Math.floor(Math.random() * numbers.length)]
    }
    if (includeUppercase) {
      return alphabet[Math.floor(Math.random() * alphabet.length)].toLocaleUpperCase()
    }
    if (includeLowercase) {
      return alphabet[Math.floor(Math.random() * alphabet.length)].toLocaleLowerCase()
    }
  }

  function generatePassword() {
    if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
      setNewPassword("select at least one option.")
      return
    }

    let password = []
    while (Number(passwordLength) > password.length) {
      const characterArray = [
        (includeUppercase && includeLowercase) ? alphabet[Math.floor(Math.random() * alphabet.length)].toLocaleUpperCase().toLocaleLowerCase() : returnDefaultLetters(),
        returnDefaultLetters(),
        returnDefaultLetters()
      ];
      const shufflePositionResult = characterArray[Math.floor(Math.random() * characterArray.length)];

      password.push(shufflePositionResult)
    }
    setNewPassword(password.join("").trim())
  }

  function initialDisplay() {
    if (newPassword !== "Your new password will appear here.") {
      return result
    } else {
      return newPassword
    }
  }

  useEffect(() => {

    if (newPassword === "Your new password will appear here.") return

    let i = 0;

    setLoadCreatePassword(true)

    const action = setInterval(() => {
      dencrypt(newPassword);

      i = i === newPassword.length - 1 ? 0 : i + 1;

      setLoadCreatePassword(false)
      passwordStrength()

    }, 2000)

    return () => clearInterval(action)

  }, [newPassword, dencrypt]);


  useEffect(() => {
    const action = setInterval(() => {
      setCopySuccessDisplay(false)
    }, 2000)


    return () => clearInterval(action)

  }, [copySuccessDisplay]);

  function passwordStrength() {
    const testedResult: testedResultProps = zxcvbn(newPassword)
    setPasswordStrengthDisplayText(passwordLabel(testedResult))
  }

  function passwordLabel(testedPassword: testedResultProps) {
    switch (testedPassword.score) {
      case 0:
        return 'Weak';
      case 1:
        return 'Weak';
      case 2:
        return 'Fair';
      case 3:
        return 'Good';
      case 4:
        return 'Strong';
      default:
        return 'Weak';
    }
  }

  return (
    <>
      <Header />

      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={`${styles.options} ${darkMode}`}>
            <div className={styles.header}>
              <div className={styles.buttons}>
                <span className={styles.red} />
                <span className={styles.yellow} />
                <span className={styles.green} />
              </div>
              <strong>Options</strong>
              <div />
            </div>

            <div className={styles.middleContent}>
              <div className={styles.passwordLength}>
                <span>Password Length:</span>
                <input
                  type="number"
                  min={6}
                  max={100}
                  value={passwordLength}
                  onChange={(e) => setPasswordLength(e.target.value)} />
              </div>

              <div className="uppercace-characters">
                <span>Include Uppercase Characters:</span>
                <input
                  type="checkbox"
                  id="uppercaceCharacters"
                  checked={includeUppercase}
                  onChange={() => setIncludeUppercase(!includeUppercase)} />
                <label htmlFor="uppercaceCharacters">( e.g. ABCDEFGH )</label>
              </div>

              <div className="lowercase-characters">
                <span>Include Lowercase Characters:</span>
                <input
                  type="checkbox"
                  id="lowercaseCharacters"
                  checked={includeLowercase}
                  onChange={() => setIncludeLowercase(!includeLowercase)}
                />
                <label htmlFor="lowercaseCharacters">( e.g. abcdefgh )</label>
              </div>

              <div className="numbers">
                <span>Include Numbers:</span>
                <input
                  type="checkbox"
                  id="numbers"
                  checked={includeNumbers}
                  onChange={() => setIncludeNumbers(!includeNumbers)} />
                <label htmlFor="numbers">( e.g. 123456 )</label>
              </div>

              <div className="symbols">
                <span>Include Symbols:</span>
                <input
                  type="checkbox"
                  id="symbols"
                  checked={includeSymbols}
                  onChange={() => setIncludeSymbols(!includeSymbols)} />
                <label htmlFor="symbols">( e.g. @#$% )</label>
              </div>
            </div>
          </div>
          <div className={`${styles.generator} ${darkMode}`}>
            <div className={styles.header}>
              <div className={styles.buttons}>
                <span className={styles.red} />
                <span className={styles.yellow} />
                <span className={styles.green} />
              </div>
              <strong>Generator</strong>
              <div />
            </div>
            <div className={styles.displayResult}>
              <label htmlFor="newPassword">Your New Password:</label>
              <input
                type="text"
                ref={inputRef}
                value={initialDisplay()}
                onChange={(e) => (e.target.value === initialDisplay())}
                id="newPassword"
              />
              <button onClick={copyToClipboard}>Copy</button>

              {copySuccessDisplay && <span className={styles.copySuccess}>Done!</span>}
            </div>

            <div className={styles.passwordStrengthDisplay}>
              <label>Password Strength:</label>
              <strong className={passwordStrengthDisplayText}>{passwordStrengthDisplayText}</strong>
            </div>

            <div className={styles.generatorButton}>
              <button onClick={generatePassword}>
                {loadCreatePassword ?
                  <Loader
                    type="Grid"
                    color="#000"
                    height={12}
                    width={25}
                    timeout={3000} //3 secs
                  />
                  : "Generate Password"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
