import { createContext, ReactNode, useEffect, useState } from "react";

type ThemeContextProps = {
  darkTheme: boolean;
  setTheme: () => void;
}

type ThemeProviderProps = {
  children: ReactNode;
}

export const ThemeContext = createContext({} as ThemeContextProps)

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [darkTheme, setDarkTheme] = useState(true);

  function setTheme() {
    setDarkTheme(!darkTheme)
  }

  useEffect(() => {
    if (darkTheme) {
      document.body.style.background = "var(--background-dark)";
    } else {
      document.body.style.background = "var(--background-light)";
    }
  }, [darkTheme]);

  return (
    <ThemeContext.Provider
      value={{
        darkTheme,
        setTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}