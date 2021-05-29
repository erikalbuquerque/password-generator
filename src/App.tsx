import { useState } from "react";
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

  function generatePassword() {
    let password = []
    while (Number(passwordLength) > password.length) {
      const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
      const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
      const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];


      const characterArray = [
        randomLetter,
        includeNumbers ? randomNumber : randomLetter,
        includeSymbols ? randomSymbol : randomLetter
      ];

      console.log(characterArray, characterArray.join(""), characterArray.length)

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
              <input type="text" value={newPassword} id="newPassword" />
              <button>Copy</button>
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
