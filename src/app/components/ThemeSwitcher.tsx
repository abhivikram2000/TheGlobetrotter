'use client';

import { 
  Box, 
  IconButton, 
  Menu, 
  MenuItem, 
  ListItemIcon, 
  ListItemText,
  Tooltip,
  Divider
} from '@mui/material';
import {
  Palette,
  DarkMode,
  LightMode,
  Brush,
  WbSunny,
  WaterDrop,
  Park,
  Flare,
  Stars,
  Terrain,
  Diamond
} from '@mui/icons-material';
import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import type { ColorScheme } from '../theme';

const colorSchemes: { value: ColorScheme; label: string; icon: JSX.Element }[] = [
  { value: 'midnight', label: 'Midnight', icon: <Stars /> },
  { value: 'emerald', label: 'Emerald', icon: <Park /> },
  { value: 'coral', label: 'Coral', icon: <WbSunny /> },
  { value: 'lavender', label: 'Lavender', icon: <Flare /> },
  { value: 'nordic', label: 'Nordic', icon: <Palette /> },
  { value: 'autumn', label: 'Autumn', icon: <Terrain /> },
  { value: 'azure', label: 'Azure', icon: <WaterDrop /> },
  { value: 'golden', label: 'Golden', icon: <Diamond /> },
];

export default function ThemeSwitcher() {
  const { mode, colorScheme, toggleMode, setColorScheme } = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleColorSchemeChange = (scheme: ColorScheme) => {
    setColorScheme(scheme);
    handleClose();
  };

  return (
    <Box>
      <Tooltip title="Theme settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ 
            ml: 2,
            color: mode === 'dark' ? 'white' : 'inherit',
            '&:hover': {
              backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
            }
          }}
        >
          <Brush />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          elevation: 8,
          sx: {
            mt: 1,
            minWidth: 180,
            '& .MuiList-root': {
              py: 1,
            },
          },
        }}
      >
        <MenuItem onClick={toggleMode}>
          <ListItemIcon>
            {mode === 'light' ? <DarkMode /> : <LightMode />}
          </ListItemIcon>
          <ListItemText>
            {mode === 'light' ? 'Dark Mode' : 'Light Mode'}
          </ListItemText>
        </MenuItem>
        <Divider sx={{ my: 1 }} />
        {colorSchemes.map((scheme) => (
          <MenuItem
            key={scheme.value}
            onClick={() => handleColorSchemeChange(scheme.value)}
            selected={colorScheme === scheme.value}
            sx={{
              '&.Mui-selected': {
                backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
              },
              '&.Mui-selected:hover': {
                backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)',
              },
            }}
          >
            <ListItemIcon>
              {scheme.icon}
            </ListItemIcon>
            <ListItemText>{scheme.label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
} 