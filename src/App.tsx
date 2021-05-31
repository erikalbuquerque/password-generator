import { useRef, useState } from "react";
import { Header } from "./components/Header";

import styles from "./styles/home.module.scss";

export function App() {
  const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  const symbols = ['"', "'", "!", "@", "#", "$", "%", "¨", "&", "*", "(", ")", "_", "-", "=", "+", "§", "£", "¢", "¬", "{", "}", "[", "]", "?"]

  const [passwordLength, setPasswordLength] = useState("6");
  const [newPassword, setNewPassword] = useState("Your new password will appear here.")

  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)

  const inputRef = useRef<HTMLInputElement>(null);

  function copyToClipboard() {
    if (inputRef) {
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


  return (
    <>
      <Header />

      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.options}>
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
              <div className="password-length">
                <span>Password Length:</span>
                <input
                  type="number"
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
          <div className={styles.generator}>
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
              <input type="text" ref={inputRef} value={newPassword} onChange={(e) => (e.target.value === newPassword)} id="newPassword" />
              <button onClick={copyToClipboard}>Copy</button>
            </div>
            <div className={styles.generatorButton}>
              <button onClick={generatePassword}>Generate Password</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
