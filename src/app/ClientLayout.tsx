'use client';

import { ThemeProvider } from './contexts/ThemeContext';
import ThemeSwitcher from './components/ThemeSwitcher';
import { Box } from '@mui/material';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <Box sx={{ position: 'fixed', top: 16, right: 16, zIndex: 1100 }}>
        <ThemeSwitcher />
      </Box>
      {children}
    </ThemeProvider>
  );
} 