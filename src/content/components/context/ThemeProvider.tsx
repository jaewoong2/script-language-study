// app/provider.tsx

'use client';

import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeContext = createContext<{
  setTheme: Dispatch<SetStateAction<string | null>>;
} | null>(null);

export default function ThemeProvider({
  children,
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(function initialize() {
    const storedTheme = localStorage.getItem('theme') ?? '';
    setTheme(storedTheme);
    document
      .querySelector('html')
      ?.setAttribute('data-theme', storedTheme);
  }, []);

  useEffect(
    function handleChangedTheme() {
      if (theme === null) {
        return;
      }

      document
        .querySelector('html')
        ?.setAttribute('data-theme', theme);

      if (theme === '') {
        localStorage.removeItem('theme');
        return;
      }

      localStorage.setItem('theme', theme);
    },
    [theme],
  );

  if (theme === null) {
    return '로딩중...';
  }

  return (
    <ThemeContext.Provider value={{ setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
