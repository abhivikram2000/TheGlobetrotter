'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createAppTheme, ColorScheme } from '../theme';
import type { PaletteMode } from '@mui/material';

interface ThemeContextType {
  mode: PaletteMode;
  colorScheme: ColorScheme;
  toggleMode: () => void;
  setColorScheme: (scheme: ColorScheme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  mode: 'light',
  colorScheme: 'default',
  toggleMode: () => {},
  setColorScheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<PaletteMode>('light');
  const [colorScheme, setColorScheme] = useState<ColorScheme>('default');

  useEffect(() => {
    // Load saved preferences from localStorage
    const savedMode = localStorage.getItem('themeMode') as PaletteMode;
    const savedScheme = localStorage.getItem('colorScheme') as ColorScheme;
    
    if (savedMode) setMode(savedMode);
    if (savedScheme) setColorScheme(savedScheme);
  }, []);

  const toggleMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('themeMode', newMode);
  };

  const handleSetColorScheme = (scheme: ColorScheme) => {
    setColorScheme(scheme);
    localStorage.setItem('colorScheme', scheme);
  };

  const theme = createAppTheme(mode, colorScheme);

  return (
    <ThemeContext.Provider 
      value={{ 
        mode, 
        colorScheme, 
        toggleMode, 
        setColorScheme: handleSetColorScheme 
      }}
    >
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
} 