import { createTheme, Theme } from '@mui/material/styles';
import { Components } from '@mui/material/styles/components';
import { PaletteMode } from '@mui/material';

export type ColorScheme = 'default' | 'sunset' | 'ocean' | 'forest' | 'aurora' | 'cosmic' | 'desert' | 'royal';

const getDesignTokens = (mode: PaletteMode, colorScheme: ColorScheme = 'default') => {
  const colorSchemes = {
    default: {
      light: {
        primary: {
          main: '#6366f1',
          light: '#818cf8',
          dark: '#4f46e5',
        },
        secondary: {
          main: '#ec4899',
          light: '#f472b6',
          dark: '#db2777',
        },
      },
      dark: {
        primary: {
          main: '#818cf8',
          light: '#a5b4fc',
          dark: '#6366f1',
        },
        secondary: {
          main: '#f472b6',
          light: '#f9a8d4',
          dark: '#ec4899',
        },
      },
    },
    sunset: {
      light: {
        primary: {
          main: '#f97316',
          light: '#fb923c',
          dark: '#ea580c',
        },
        secondary: {
          main: '#8b5cf6',
          light: '#a78bfa',
          dark: '#7c3aed',
        },
      },
      dark: {
        primary: {
          main: '#fb923c',
          light: '#fdba74',
          dark: '#f97316',
        },
        secondary: {
          main: '#a78bfa',
          light: '#c4b5fd',
          dark: '#8b5cf6',
        },
      },
    },
    ocean: {
      light: {
        primary: {
          main: '#0ea5e9',
          light: '#38bdf8',
          dark: '#0284c7',
        },
        secondary: {
          main: '#06b6d4',
          light: '#22d3ee',
          dark: '#0891b2',
        },
      },
      dark: {
        primary: {
          main: '#38bdf8',
          light: '#7dd3fc',
          dark: '#0ea5e9',
        },
        secondary: {
          main: '#22d3ee',
          light: '#67e8f9',
          dark: '#06b6d4',
        },
      },
    },
    forest: {
      light: {
        primary: {
          main: '#22c55e',
          light: '#4ade80',
          dark: '#16a34a',
        },
        secondary: {
          main: '#14b8a6',
          light: '#2dd4bf',
          dark: '#0d9488',
        },
      },
      dark: {
        primary: {
          main: '#4ade80',
          light: '#86efac',
          dark: '#22c55e',
        },
        secondary: {
          main: '#2dd4bf',
          light: '#5eead4',
          dark: '#14b8a6',
        },
      },
    },
    aurora: {
      light: {
        primary: {
          main: '#10b981',
          light: '#34d399',
          dark: '#059669',
        },
        secondary: {
          main: '#6366f1',
          light: '#818cf8',
          dark: '#4f46e5',
        },
      },
      dark: {
        primary: {
          main: '#34d399',
          light: '#6ee7b7',
          dark: '#10b981',
        },
        secondary: {
          main: '#818cf8',
          light: '#a5b4fc',
          dark: '#6366f1',
        },
      },
    },
    cosmic: {
      light: {
        primary: {
          main: '#8b5cf6',
          light: '#a78bfa',
          dark: '#7c3aed',
        },
        secondary: {
          main: '#ec4899',
          light: '#f472b6',
          dark: '#db2777',
        },
      },
      dark: {
        primary: {
          main: '#a78bfa',
          light: '#c4b5fd',
          dark: '#8b5cf6',
        },
        secondary: {
          main: '#f472b6',
          light: '#f9a8d4',
          dark: '#ec4899',
        },
      },
    },
    desert: {
      light: {
        primary: {
          main: '#d97706',
          light: '#f59e0b',
          dark: '#b45309',
        },
        secondary: {
          main: '#c2410c',
          light: '#ea580c',
          dark: '#9a3412',
        },
      },
      dark: {
        primary: {
          main: '#f59e0b',
          light: '#fbbf24',
          dark: '#d97706',
        },
        secondary: {
          main: '#ea580c',
          light: '#f97316',
          dark: '#c2410c',
        },
      },
    },
    royal: {
      light: {
        primary: {
          main: '#6d28d9',
          light: '#7c3aed',
          dark: '#5b21b6',
        },
        secondary: {
          main: '#1d4ed8',
          light: '#2563eb',
          dark: '#1e40af',
        },
      },
      dark: {
        primary: {
          main: '#7c3aed',
          light: '#8b5cf6',
          dark: '#6d28d9',
        },
        secondary: {
          main: '#2563eb',
          light: '#3b82f6',
          dark: '#1d4ed8',
        },
      },
    },
  };

  return {
    palette: {
      mode,
      ...(colorSchemes[colorScheme][mode]),
      background: {
        default: mode === 'light' ? '#f3f4f6' : '#030712',
        paper: mode === 'light' ? '#ffffff' : '#111827',
      },
      text: {
        primary: mode === 'light' ? '#1e293b' : '#f8fafc',
        secondary: mode === 'light' ? '#475569' : '#94a3b8',
      },
      divider: mode === 'light' ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.08)',
      action: {
        active: mode === 'light' ? 'rgba(0, 0, 0, 0.54)' : 'rgba(255, 255, 255, 0.7)',
        hover: mode === 'light' ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.08)',
        selected: mode === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.16)',
        disabled: mode === 'light' ? 'rgba(0, 0, 0, 0.26)' : 'rgba(255, 255, 255, 0.3)',
        disabledBackground: mode === 'light' ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.12)',
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
      },
      h2: {
        fontWeight: 700,
      },
      h3: {
        fontWeight: 600,
      },
      h4: {
        fontWeight: 600,
      },
      h5: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 600,
      },
      subtitle1: {
        fontWeight: 500,
      },
      subtitle2: {
        fontWeight: 500,
      },
      body1: {
        fontWeight: 400,
      },
      body2: {
        fontWeight: 400,
      },
      button: {
        fontWeight: 600,
        textTransform: 'none' as const,
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: ({ theme }: { theme: Theme }) => ({
            textTransform: 'none' as const,
            fontWeight: 600,
            borderRadius: '0.5rem',
            '&:hover': {
              boxShadow: 'none',
            },
          }),
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '0.75rem',
            boxShadow: mode === 'light' 
              ? '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)'
              : '0 1px 3px 0 rgb(0 0 0 / 0.25), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: 16,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            ...(mode === 'dark' && {
              backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))',
            }),
          },
        },
      },
    },
  };
};

export const createAppTheme = (mode: PaletteMode, colorScheme: ColorScheme) => {
  return createTheme(getDesignTokens(mode, colorScheme));
};

export default createAppTheme('light', 'default'); 