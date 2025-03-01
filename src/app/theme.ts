import { createTheme, Theme } from '@mui/material/styles';
import { Components } from '@mui/material/styles/components';
import { PaletteMode } from '@mui/material';

export type ColorScheme = 'midnight' | 'emerald' | 'coral' | 'lavender' | 'nordic' | 'autumn' | 'azure' | 'golden';

const getDesignTokens = (mode: PaletteMode, colorScheme: ColorScheme = 'midnight') => {
  // Define color schemes first
  const colorSchemes = {
    midnight: {
      light: {
        primary: {
          main: '#2c3e50',
          light: '#34495e',
          dark: '#1a2530',
        },
        secondary: {
          main: '#3498db',
          light: '#5dade2',
          dark: '#2980b9',
        },
        error: {
          main: '#e74c3c',
        },
      },
      dark: {
        primary: {
          main: '#34495e',
          light: '#4a6b8a',
          dark: '#2c3e50',
        },
        secondary: {
          main: '#5dade2',
          light: '#85c1e9',
          dark: '#3498db',
        },
        error: {
          main: '#e74c3c',
        },
      },
    },
    emerald: {
      light: {
        primary: {
          main: '#16a085',
          light: '#1abc9c',
          dark: '#0e6655',
        },
        secondary: {
          main: '#27ae60',
          light: '#2ecc71',
          dark: '#1e8449',
        },
        error: {
          main: '#8e44ad',
        },
      },
      dark: {
        primary: {
          main: '#1abc9c',
          light: '#48c9b0',
          dark: '#16a085',
        },
        secondary: {
          main: '#2ecc71',
          light: '#58d68d',
          dark: '#27ae60',
        },
        error: {
          main: '#9b59b6',
        },
      },
    },
    coral: {
      light: {
        primary: {
          main: '#e67e22',
          light: '#f39c12',
          dark: '#d35400',
        },
        secondary: {
          main: '#e74c3c',
          light: '#ec7063',
          dark: '#c0392b',
        },
        error: {
          main: '#3498db',
        },
      },
      dark: {
        primary: {
          main: '#f39c12',
          light: '#f5b041',
          dark: '#e67e22',
        },
        secondary: {
          main: '#ec7063',
          light: '#f1948a',
          dark: '#e74c3c',
        },
        error: {
          main: '#5dade2',
        },
      },
    },
    lavender: {
      light: {
        primary: {
          main: '#8e44ad',
          light: '#9b59b6',
          dark: '#6c3483',
        },
        secondary: {
          main: '#5b48a2',
          light: '#7d6cc8',
          dark: '#4a3b82',
        },
        error: {
          main: '#16a085',
        },
      },
      dark: {
        primary: {
          main: '#9b59b6',
          light: '#af7ac5',
          dark: '#8e44ad',
        },
        secondary: {
          main: '#7d6cc8',
          light: '#9786d1',
          dark: '#5b48a2',
        },
        error: {
          main: '#1abc9c',
        },
      },
    },
    nordic: {
      light: {
        primary: {
          main: '#5d6d7e',
          light: '#7f8c8d',
          dark: '#34495e',
        },
        secondary: {
          main: '#2980b9',
          light: '#3498db',
          dark: '#1f618d',
        },
        error: {
          main: '#c0392b',
        },
      },
      dark: {
        primary: {
          main: '#7f8c8d',
          light: '#95a5a6',
          dark: '#5d6d7e',
        },
        secondary: {
          main: '#3498db',
          light: '#5dade2',
          dark: '#2980b9',
        },
        error: {
          main: '#e74c3c',
        },
      },
    },
    autumn: {
      light: {
        primary: {
          main: '#d35400',
          light: '#e67e22',
          dark: '#a04000',
        },
        secondary: {
          main: '#7d3c98',
          light: '#9b59b6',
          dark: '#5b2c6f',
        },
        error: {
          main: '#2980b9',
        },
      },
      dark: {
        primary: {
          main: '#e67e22',
          light: '#f39c12',
          dark: '#d35400',
        },
        secondary: {
          main: '#9b59b6',
          light: '#af7ac5',
          dark: '#7d3c98',
        },
        error: {
          main: '#3498db',
        },
      },
    },
    azure: {
      light: {
        primary: {
          main: '#2471a3',
          light: '#3498db',
          dark: '#1a5276',
        },
        secondary: {
          main: '#138d75',
          light: '#16a085',
          dark: '#0e6655',
        },
        error: {
          main: '#e74c3c',
        },
      },
      dark: {
        primary: {
          main: '#3498db',
          light: '#5dade2',
          dark: '#2471a3',
        },
        secondary: {
          main: '#16a085',
          light: '#1abc9c',
          dark: '#138d75',
        },
        error: {
          main: '#ec7063',
        },
      },
    },
    golden: {
      light: {
        primary: {
          main: '#b9770e',
          light: '#d4ac0d',
          dark: '#9a7d0a',
        },
        secondary: {
          main: '#7e5109',
          light: '#b9770e',
          dark: '#5d3f06',
        },
        error: {
          main: '#2980b9',
        },
      },
      dark: {
        primary: {
          main: '#d4ac0d',
          light: '#f1c40f',
          dark: '#b9770e',
        },
        secondary: {
          main: '#b9770e',
          light: '#d68910',
          dark: '#7e5109',
        },
        error: {
          main: '#3498db',
        },
      },
    },
  };

  // Ensure colorScheme is valid, default to 'midnight' if not
  const safeColorScheme = (colorSchemes[colorScheme] ? colorScheme : 'midnight') as ColorScheme;
  
  // Ensure mode is valid, default to 'light' if not
  const safeMode = (mode === 'light' || mode === 'dark') ? mode : 'light';
  
  // Enhanced background and text colors for better contrast and readability
  const backgroundColors = {
    light: {
      default: '#f5f7fa',
      paper: '#ffffff',
      subtle: '#f0f2f5',
    },
    dark: {
      default: '#121212',
      paper: '#1e1e1e',
      subtle: '#2d2d2d',
    }
  };

  const textColors = {
    light: {
      primary: '#2c3e50',
      secondary: '#5d6d7e',
      disabled: 'rgba(44, 62, 80, 0.6)',
    },
    dark: {
      primary: '#ecf0f1',
      secondary: '#bdc3c7',
      disabled: 'rgba(236, 240, 241, 0.6)',
    }
  };

  return {
    palette: {
      mode: safeMode,
      ...(colorSchemes[safeColorScheme] && colorSchemes[safeColorScheme][safeMode] 
        ? colorSchemes[safeColorScheme][safeMode] 
        : colorSchemes.midnight[safeMode]),
      background: {
        default: backgroundColors[safeMode].default,
        paper: backgroundColors[safeMode].paper,
        subtle: backgroundColors[safeMode].subtle,
      },
      text: {
        primary: textColors[safeMode].primary,
        secondary: textColors[safeMode].secondary,
        disabled: textColors[safeMode].disabled,
      },
      divider: safeMode === 'light' ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.12)',
      action: {
        active: safeMode === 'light' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.7)',
        hover: safeMode === 'light' ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.08)',
        selected: safeMode === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.16)',
        disabled: safeMode === 'light' ? 'rgba(0, 0, 0, 0.26)' : 'rgba(255, 255, 255, 0.3)',
        disabledBackground: safeMode === 'light' ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.12)',
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
        letterSpacing: '-0.025em',
      },
      h2: {
        fontWeight: 700,
        letterSpacing: '-0.025em',
      },
      h3: {
        fontWeight: 600,
        letterSpacing: '-0.0125em',
      },
      h4: {
        fontWeight: 600,
        letterSpacing: '-0.0125em',
      },
      h5: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 600,
      },
      subtitle1: {
        fontWeight: 500,
        letterSpacing: '0.0075em',
      },
      subtitle2: {
        fontWeight: 500,
        letterSpacing: '0.00625em',
      },
      body1: {
        fontWeight: 400,
        letterSpacing: '0.00938em',
      },
      body2: {
        fontWeight: 400,
        letterSpacing: '0.00938em',
      },
      button: {
        fontWeight: 600,
        textTransform: 'none' as const,
        letterSpacing: '0.02857em',
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
            boxShadow: safeMode === 'light' ? '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)' : 'none',
            transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
            '&:hover': {
              boxShadow: safeMode === 'light' ? '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)' : '0 3px 6px rgba(255,255,255,0.1), 0 3px 6px rgba(255,255,255,0.15)',
              transform: 'translateY(-2px)',
            },
          }),
          contained: ({ theme }: { theme: Theme }) => ({
            '&:hover': {
              boxShadow: safeMode === 'light' ? '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)' : '0 10px 20px rgba(255,255,255,0.1), 0 6px 6px rgba(255,255,255,0.15)',
            },
          }),
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '1rem',
            boxShadow: safeMode === 'light' 
              ? '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'
              : '0 1px 3px rgba(0,0,0,0.5), 0 1px 2px rgba(0,0,0,0.4)',
            transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
            '&:hover': {
              boxShadow: safeMode === 'light' 
                ? '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
                : '0 3px 6px rgba(0,0,0,0.6), 0 3px 6px rgba(0,0,0,0.5)',
            },
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: 16,
            boxShadow: safeMode === 'light' 
              ? '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)'
              : '0 14px 28px rgba(0,0,0,0.7), 0 10px 10px rgba(0,0,0,0.6)',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            ...(safeMode === 'dark' && {
              backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.025), rgba(255, 255, 255, 0.025))',
            }),
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: '0.5rem',
            fontWeight: 500,
          },
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            borderRadius: '0.5rem',
            '&:hover': {
              backgroundColor: safeMode === 'light' ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.08)',
            },
          },
        },
      },
    },
  };
};

export const createAppTheme = (mode: PaletteMode, colorScheme: ColorScheme) => {
  return createTheme(getDesignTokens(mode, colorScheme));
};

export default createAppTheme('light', 'midnight'); 