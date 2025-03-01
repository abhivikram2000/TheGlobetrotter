import { createAppTheme } from '../theme';
import { PaletteMode } from '@mui/material';

describe('Theme Configuration', () => {
  it('creates a light theme with default color scheme', () => {
    const theme = createAppTheme('light', 'default');

    expect(theme.palette.mode).toBe('light');
    expect(theme.palette.primary.main).toBe('#6366f1');
    expect(theme.palette.secondary.main).toBe('#ec4899');
    expect(theme.palette.background.default).toBe('#f3f4f6');
    expect(theme.palette.background.paper).toBe('#ffffff');
  });

  it('creates a dark theme with default color scheme', () => {
    const theme = createAppTheme('dark', 'default');

    expect(theme.palette.mode).toBe('dark');
    expect(theme.palette.primary.main).toBe('#818cf8');
    expect(theme.palette.secondary.main).toBe('#f472b6');
    expect(theme.palette.background.default).toBe('#030712');
    expect(theme.palette.background.paper).toBe('#111827');
  });

  it('applies sunset color scheme correctly', () => {
    const theme = createAppTheme('light', 'sunset');

    expect(theme.palette.primary.main).toBe('#f97316');
    expect(theme.palette.secondary.main).toBe('#8b5cf6');
  });

  it('applies typography settings', () => {
    const theme = createAppTheme('light', 'default');

    expect(theme.typography.fontFamily).toContain('Inter');
    expect(theme.typography.h1.fontWeight).toBe(700);
    expect(theme.typography.button.textTransform).toBe('none');
  });

  it('applies component overrides', () => {
    const theme = createAppTheme('light', 'default');

    expect(theme.components?.MuiButton?.styleOverrides?.root).toBeDefined();
    expect(theme.components?.MuiCard?.styleOverrides?.root).toBeDefined();
    expect(theme.components?.MuiDialog?.styleOverrides?.paper).toBeDefined();
  });
}); 