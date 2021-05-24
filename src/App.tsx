import { Header } from "./components/Header";

import styles from "./styles/home.module.scss";

export function App() {
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
                <input type="number" />
              </div>

              <div className="uppercace-characters">
                <span>Include Uppercase Characters:</span>
                <input type="checkbox" id="uppercaceCharacters" />
                <label htmlFor="uppercaceCharacters">( e.g. ABCDEFGH )</label>
              </div>

              <div className="lowercase-characters">
                <span>Include Lowercase Characters:</span>
                <input type="checkbox" id="lowercaseCharacters" />
                <label htmlFor="lowercaseCharacters">( e.g. abcdefgh )</label>
              </div>

              <div className="numbers">
                <span>Include Numbers:</span>
                <input type="checkbox" id="numbers" />
                <label htmlFor="numbers">( e.g. 123456 )</label>
              </div>

              <div className="symbols">
                <span>Include Symbols:</span>
                <input type="checkbox" id="symbols" />
                <label htmlFor="symbols">( e.g. @#$% )</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
