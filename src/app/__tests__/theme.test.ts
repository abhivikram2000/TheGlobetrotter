import { createAppTheme } from '../theme';
import { PaletteMode } from '@mui/material';

describe('Theme Configuration', () => {
  it('creates a light theme with midnight color scheme', () => {
    const theme = createAppTheme('light', 'midnight');

    expect(theme.palette.mode).toBe('light');
    expect(theme.palette.primary.main).toBe('#2c3e50');
    expect(theme.palette.secondary.main).toBe('#3498db');
    expect(theme.palette.background.default).toBe('#f5f7fa');
    expect(theme.palette.background.paper).toBe('#ffffff');
  });

  it('creates a dark theme with midnight color scheme', () => {
    const theme = createAppTheme('dark', 'midnight');

    expect(theme.palette.mode).toBe('dark');
    expect(theme.palette.primary.main).toBe('#34495e');
    expect(theme.palette.secondary.main).toBe('#5dade2');
    expect(theme.palette.background.default).toBe('#121212');
    expect(theme.palette.background.paper).toBe('#1e1e1e');
  });

  it('applies emerald color scheme correctly', () => {
    const theme = createAppTheme('light', 'emerald');

    expect(theme.palette.primary.main).toBe('#16a085');
    expect(theme.palette.secondary.main).toBe('#27ae60');
  });

  it('applies typography settings', () => {
    const theme = createAppTheme('light', 'midnight');

    expect(theme.typography.fontFamily).toContain('Inter');
    expect(theme.typography.h1.fontWeight).toBe(700);
    expect(theme.typography.button.textTransform).toBe('none');
  });

  it('applies component overrides', () => {
    const theme = createAppTheme('light', 'midnight');

    expect(theme.components?.MuiButton?.styleOverrides?.root).toBeDefined();
    expect(theme.components?.MuiCard?.styleOverrides?.root).toBeDefined();
    expect(theme.components?.MuiDialog?.styleOverrides?.paper).toBeDefined();
  });
}); 